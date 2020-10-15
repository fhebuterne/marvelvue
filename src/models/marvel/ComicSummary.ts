import {Model} from "@vuex-orm/core";

export default class ComicSummary extends Model {
    static entity = 'comicSummary'

    static fields () {
        return {
            path: this.string(''),
            extension: this.string('')
        }
    }

    resourceURI?: string;
    name?: string;

}
