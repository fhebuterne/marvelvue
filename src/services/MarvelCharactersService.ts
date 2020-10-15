import {Md5} from "ts-md5";
import CharacterDataWrapper from "@/models/marvel/CharacterDataWrapper";
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

    getCharacters(nameStartsWith?: string) {
        // delete all is required else store adding and create double
        Character.deleteAll()
        return Character.api().get(`/characters?apikey=${this.publicKey}&hash=${this.hash}&nameStartsWith=${nameStartsWith}`, {
            dataTransformer: (response) => {
                return response.data.data.results;
            }
        });
    }

}

export const marvelCharactersService = new MarvelCharactersService();
