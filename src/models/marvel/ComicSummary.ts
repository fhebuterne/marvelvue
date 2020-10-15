import {Model} from "@vuex-orm/core";

export default class ComicSummary extends Model {
    static entity = 'comicSummary'

    static fields () {
        return {
            resourceURI: this.string(''),
            name: this.string('')
        }
    }

    resourceURI?: string;
    name?: string;

}
