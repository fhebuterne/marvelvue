import Character from "@/models/marvel/character/Character";
import {MarvelSearchParams} from "@/models/marvel/MarvelSearchParams";
import {SearchParameters} from "@/models/base/SearchParameters";
import CharacterDataContainer from "@/models/marvel/character/CharacterDataContainer";
import CharacterResults from "@/models/marvel/character/CharacterResults";

class MarvelCharactersService {

    private readonly publicKey: string = process.env.VUE_APP_MARVEL_PUBLIC_KEY;
    private url = `/characters`;

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

    getCharacters(marvelSearchParams?: MarvelSearchParams) {
        this.resetVuex();

        let currentUrl = `${this.url}?apikey=${this.publicKey}`
        if (marvelSearchParams) {
            currentUrl += "&" + SearchParameters.objToParams(marvelSearchParams)
        }

        return CharacterDataContainer.api().get(`${currentUrl}`, {
            dataTransformer: (response) => {
                return this.transformResultsCaracters(response, marvelSearchParams);
            }
        });
    }

    getCharacter(characterId: string) {
        this.resetVuex();

        const currentUrl = `${this.url}/${characterId}?apikey=${this.publicKey}`
        return CharacterDataContainer.api().get(`${currentUrl}`, {
            dataTransformer: (response) => {
                return this.transformResultsCaracters(response);
            }
        });
    }

}

export const marvelCharactersService = new MarvelCharactersService();
