import {Md5} from "ts-md5";
import Character from "@/models/marvel/Character";
import {SearchParameters} from "@/models/base/SearchParameters";

class MarvelCharactersService {

    private readonly publicKey: string = process.env.VUE_APP_MARVEL_PUBLIC_KEY;

    getCharacters(searchParameters?: SearchParameters) {
        // delete all is required else store adding and create double
        Character.deleteAll()

        let url = `/characters?apikey=${this.publicKey}`

        if (searchParameters) {
            url += "&" + searchParameters.toString()
        }

        return Character.api().get(`${url}`, {
            dataTransformer: (response) => {
                response.data.data.results.forEach((result: Character, index: number) => {
                    response.data.data.results[index].thumbnail = response.data.data.results[index].thumbnail.path + "." + response.data.data.results[index].thumbnail.extension
                    response.data.data.results[index].series = response.data.data.results[index].series.available
                    response.data.data.results[index].events = response.data.data.results[index].events.available
                    response.data.data.results[index].stories = response.data.data.results[index].stories.available
                    response.data.data.results[index].comics = response.data.data.results[index].comics.available
                });

                return response.data.data.results;
            }
        });
    }

}

export const marvelCharactersService = new MarvelCharactersService();
