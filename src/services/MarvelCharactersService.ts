import {Md5} from "ts-md5";
import CharacterDataWrapper from "@/models/marvel/CharacterDataWrapper";

export default class MarvelCharactersService {

    private publicKey: string;
    private hash: string;

    constructor() {
        const timestamp = new Date().getTime()
        console.log(process.env);
        const privateKey = process.env.VUE_APP_MARVEL_PRIVATE_KEY;
        this.publicKey = process.env.VUE_APP_MARVEL_PUBLIC_KEY;
        this.hash = Md5.hashStr(timestamp + privateKey + this.publicKey).toString();
    }

    async getCaracters() {
        return await CharacterDataWrapper.api().get(`/characters?apikey=${this.publicKey}&hash=${this.hash}`);
    }

}

export const marvelCharactersService = new MarvelCharactersService();
