import {Md5} from "ts-md5";
import Character from "@/models/marvel/Character";

export default class MarvelCharactersService {

    private publicKey: string;
    private hash: string;

    constructor() {
        const timestamp = new Date().getTime() + Math.random();
        const privateKey = process.env.VUE_APP_MARVEL_PRIVATE_KEY;
        this.publicKey = process.env.VUE_APP_MARVEL_PUBLIC_KEY;
        this.hash = Md5.hashStr(timestamp + privateKey + this.publicKey).toString();
    }

    getCharacters(nameStartsWith = 'ca') {
        // delete all is required else store adding and create double
        Character.deleteAll()
        return Character.api().get(`/characters?apikey=${this.publicKey}&hash=${this.hash}&nameStartsWith=${nameStartsWith}`, {
            dataTransformer: (response) => {
                if (response.data.data.results) {
                    response.data.data.results.forEach((result: Character, index: number) => {
                        response.data.data.results[index].series = response.data.data.results[index].series.available
                        response.data.data.results[index].events = response.data.data.results[index].events.available
                        response.data.data.results[index].stories = response.data.data.results[index].stories.available
                        response.data.data.results[index].comics = response.data.data.results[index].comics.available
                    });
                }

                console.log(response);

                return response.data.data.results;
            }
        });
    }

}

export const marvelCharactersService = new MarvelCharactersService();
