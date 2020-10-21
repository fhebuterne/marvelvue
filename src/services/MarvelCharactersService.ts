import Character from "@/models/marvel/character/Character";
import {MarvelSearchParams} from "@/models/marvel/MarvelSearchParams";
import {SearchParameters} from "@/models/base/SearchParameters";
import CharacterDataContainer from "@/models/marvel/character/CharacterDataContainer";
import CharacterResults from "@/models/marvel/character/CharacterResults";
import {EntityEnum} from "@/models/marvel/base/EntityEnum";
import {Response} from "@vuex-orm/plugin-axios";

class MarvelCharactersService {

    private readonly publicKey: string = process.env.VUE_APP_MARVEL_PUBLIC_KEY;

    private transformResultsCaracters(response: any, marvelSearchParams?: MarvelSearchParams) {
        response.data.data.results.forEach((result: Character, index: number) => {
            response.data.data.results[index].thumbnail = response.data.data.results[index].thumbnail.path + "." + response.data.data.results[index].thumbnail.extension;
            response.data.data.results[index].series = response.data.data.results[index].series.available;
            response.data.data.results[index].events = response.data.data.results[index].events.available;
            response.data.data.results[index].stories = response.data.data.results[index].stories.available;
            response.data.data.results[index].comics = response.data.data.results[index].comics.available;
        });
        if (marvelSearchParams) {
            response.data.data.marvelSearchParams = marvelSearchParams;
        }
        return response.data.data
    }

    private resetVuex(): void {
        // delete all is required else store adding and create double
        CharacterDataContainer.deleteAll();
        Character.deleteAll();
        CharacterResults.deleteAll();
    }

    getCharacterBy(entityEnum: EntityEnum, id: string, marvelSearchParams?: MarvelSearchParams): Promise<Response> {
        if (entityEnum == EntityEnum.STORY) {
            return this.getCharactersByStory(id, marvelSearchParams)
        }

        if (entityEnum == EntityEnum.SERIE) {
            return this.getCharactersBySerie(id, marvelSearchParams)
        }

        if (entityEnum == EntityEnum.COMIC) {
            return this.getCharactersByComic(id, marvelSearchParams)
        }

        if (entityEnum == EntityEnum.EVENT) {
            return this.getCharactersByEvent(id, marvelSearchParams)
        }

        return this.getCharactersByStory(id, marvelSearchParams)
    }

    private getBaseUrl(prefix: string, id: string, marvelSearchParams?: MarvelSearchParams) {
        let currentUrl = `/${prefix}/${id}/characters?apikey=${this.publicKey}`
        if (marvelSearchParams) {
            currentUrl += "&" + SearchParameters.objToParams(marvelSearchParams);
        }
        return currentUrl;
    }

    getCharacters(marvelSearchParams?: MarvelSearchParams) {
        this.resetVuex();

        let currentUrl = `/characters?apikey=${this.publicKey}`
        if (marvelSearchParams) {
            currentUrl += "&" + SearchParameters.objToParams(marvelSearchParams)
        }

        return CharacterDataContainer.api().get(`${currentUrl}`, {
            dataTransformer: (response) => {
                return this.transformResultsCaracters(response, marvelSearchParams);
            }
        });
    }

    getCharacter(characterId: string, marvelSearchParams?: MarvelSearchParams) {
        this.resetVuex();

        const currentUrl = `/characters/${characterId}?apikey=${this.publicKey}`
        return CharacterDataContainer.api().get(`${currentUrl}`, {
            dataTransformer: (response) => {
                return this.transformResultsCaracters(response);
            }
        });
    }

    getCharactersByComic(comicId: string, marvelSearchParams?: MarvelSearchParams) {
        this.resetVuex();

        return CharacterDataContainer.api().get(this.getBaseUrl("comics", comicId, marvelSearchParams), {
            dataTransformer: (response) => {
                return response.data.data;
            }
        });
    }

    getCharactersByStory(storyId: string, marvelSearchParams?: MarvelSearchParams) {
        this.resetVuex();

        return CharacterDataContainer.api().get(this.getBaseUrl("stories", storyId, marvelSearchParams), {
            dataTransformer: (response) => {
                return response.data.data;
            }
        });
    }

    getCharactersBySerie(serieId: string, marvelSearchParams?: MarvelSearchParams) {
        this.resetVuex();

        return CharacterDataContainer.api().get(this.getBaseUrl("series", serieId, marvelSearchParams), {
            dataTransformer: (response) => {
                return response.data.data;
            }
        });
    }

    getCharactersByEvent(eventId: string, marvelSearchParams?: MarvelSearchParams) {
        this.resetVuex();

        return CharacterDataContainer.api().get(this.getBaseUrl("events", eventId, marvelSearchParams), {
            dataTransformer: (response) => {
                return response.data.data;
            }
        });
    }

}

export const marvelCharactersService = new MarvelCharactersService();
