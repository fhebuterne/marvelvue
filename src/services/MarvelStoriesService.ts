import Story from "@/models/marvel/story/Story";
import StoryResults from "@/models/marvel/story/StoryResults";
import StoryDataContainer from "@/models/marvel/story/StoryDataContainer";
import Character from "@/models/marvel/character/Character";
import {EntityEnum} from "@/models/marvel/base/EntityEnum";
import {MarvelSearchParams} from "@/models/marvel/MarvelSearchParams";
import {Response} from "@vuex-orm/plugin-axios";
import {SearchParameters} from "@/models/base/SearchParameters";

class MarvelStoriesService {

    private readonly publicKey: string = process.env.VUE_APP_MARVEL_PUBLIC_KEY;

    private resetVuex(): void {
        Story.deleteAll();
        StoryResults.deleteAll();
        StoryDataContainer.deleteAll();
    }

    getStoryBy(entityEnum: EntityEnum, id: string, marvelSearchParams?: MarvelSearchParams): Promise<Response> {
        if (entityEnum == EntityEnum.CHARACTER) {
            return this.getStoriesByCharacter(id, marvelSearchParams)
        }

        if (entityEnum == EntityEnum.SERIE) {
            return this.getStoriesBySerie(id, marvelSearchParams)
        }

        if (entityEnum == EntityEnum.COMIC) {
            return this.getStoriesByComic(id, marvelSearchParams)
        }

        return this.getStoriesByCharacter(id, marvelSearchParams)
    }

    private getBaseUrl(prefix: string, id: string, marvelSearchParams?: MarvelSearchParams) {
        let currentUrl = `/${prefix}/${id}/comics?apikey=${this.publicKey}`
        if (marvelSearchParams) {
            currentUrl += "&" + SearchParameters.objToParams(marvelSearchParams);
        }
        return currentUrl;
    }

    getStory(storyId: string) {
        this.resetVuex();

        const currentUrl = `/stories/${storyId}?apikey=${this.publicKey}`
        return StoryDataContainer.api().get(`${currentUrl}`, {
            dataTransformer: (response) => {
                response.data.data.results.forEach((result: Character, index: number) => {
                    if (response.data.data.results[index].thumbnail) {
                        response.data.data.results[index].thumbnail = response.data.data.results[index].thumbnail.path + "." + response.data.data.results[index].thumbnail.extension;
                    }
                });

                return response.data.data;
            }
        });
    }

    getStoriesByCharacter(characterId: string, marvelSearchParams?: MarvelSearchParams) {
        this.resetVuex();

        return StoryDataContainer.api().get(this.getBaseUrl("characters", characterId, marvelSearchParams), {
            dataTransformer: (response) => {
                return response.data.data;
            }
        });
    }

    getStoriesByComic(comicId: string, marvelSearchParams?: MarvelSearchParams) {
        this.resetVuex();

        return StoryDataContainer.api().get(this.getBaseUrl("comics", comicId, marvelSearchParams), {
            dataTransformer: (response) => {
                return response.data.data;
            }
        });
    }

    getStoriesBySerie(serieId: string, marvelSearchParams?: MarvelSearchParams) {
        this.resetVuex();

        return StoryDataContainer.api().get(this.getBaseUrl("series", serieId, marvelSearchParams), {
            dataTransformer: (response) => {
                return response.data.data;
            }
        });
    }

}

export const marvelStoriesService = new MarvelStoriesService();
