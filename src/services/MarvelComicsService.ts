import Comic from "@/models/marvel/comic/Comic";
import ComicResults from "@/models/marvel/comic/ComicResults";
import ComicDataContainer from "@/models/marvel/comic/ComicDataContainer";
import Character from "@/models/marvel/character/Character";
import {MarvelSearchParams} from "@/models/marvel/MarvelSearchParams";
import {SearchParameters} from "@/models/base/SearchParameters";
import {EntityEnum} from "@/models/marvel/base/EntityEnum";
import {Response} from "@vuex-orm/plugin-axios";

class MarvelComicsService {

    private readonly publicKey: string = process.env.VUE_APP_MARVEL_PUBLIC_KEY;

    private resetVuex(): void {
        Comic.deleteAll();
        ComicResults.deleteAll();
        ComicDataContainer.deleteAll();
    }

    getComicBy(entityEnum: EntityEnum, id: string, marvelSearchParams?: MarvelSearchParams): Promise<Response> {
        if (entityEnum == EntityEnum.CHARACTER) {
            return this.getComicsByCharacter(id, marvelSearchParams)
        }

        if (entityEnum == EntityEnum.SERIE) {
            return this.getComicsBySerie(id, marvelSearchParams)
        }

        if (entityEnum == EntityEnum.STORY) {
            return this.getComicsByStory(id, marvelSearchParams)
        }

        if (entityEnum == EntityEnum.EVENT) {
            return this.getComicsByEvent(id, marvelSearchParams)
        }

        return this.getComicsByCharacter(id, marvelSearchParams)
    }

    private getBaseUrl(prefix: string, id: string, marvelSearchParams?: MarvelSearchParams) {
        let currentUrl = `/${prefix}/${id}/comics?apikey=${this.publicKey}`
        if (marvelSearchParams) {
            currentUrl += "&" + SearchParameters.objToParams(marvelSearchParams);
        }
        return currentUrl;
    }

    getComic(comicId: string) {
        this.resetVuex();

        const currentUrl = `/comics/${comicId}?apikey=${this.publicKey}`
        return ComicDataContainer.api().get(`${currentUrl}`, {
            dataTransformer: (response) => {
                response.data.data.results.forEach((result: Character, index: number) => {
                    if (response.data.data.results[index].images.length > 0) {
                        response.data.data.results[index].thumbnail = response.data.data.results[index].images[0].path + "." + response.data.data.results[index].images[0].extension;
                    }
                });
                return response.data.data;
            }
        });
    }

    getComicsByCharacter(characterId: string, marvelSearchParams?: MarvelSearchParams) {
        this.resetVuex();

        return ComicDataContainer.api().get(this.getBaseUrl("characters", characterId, marvelSearchParams), {
            dataTransformer: (response) => {
                return response.data.data;
            }
        });
    }

    getComicsByStory(storyId: string, marvelSearchParams?: MarvelSearchParams) {
        this.resetVuex();

        return ComicDataContainer.api().get(this.getBaseUrl("stories", storyId, marvelSearchParams), {
            dataTransformer: (response) => {
                return response.data.data;
            }
        });
    }

    getComicsBySerie(serieId: string, marvelSearchParams?: MarvelSearchParams) {
        this.resetVuex();

        return ComicDataContainer.api().get(this.getBaseUrl("series", serieId, marvelSearchParams), {
            dataTransformer: (response) => {
                return response.data.data;
            }
        });
    }

    getComicsByEvent(eventId: string, marvelSearchParams?: MarvelSearchParams) {
        this.resetVuex();

        return ComicDataContainer.api().get(this.getBaseUrl("events", eventId, marvelSearchParams), {
            dataTransformer: (response) => {
                return response.data.data;
            }
        });
    }

}

export const marvelComicsService = new MarvelComicsService();
