import {Model} from "@vuex-orm/core";
import ComicSummary from "@/models/marvel/ComicSummary";

export default class ComicList extends Model {
    static entity = 'comicList'

    static fields () {
        return {
            available: this.number(0),
            returned: this.number(0),
            collectionURI: this.string(''),
            items: this.hasMany(ComicSummary, 'itemsComicSummary')
        }
    }

    available?: number;
    returned?: number;
    collectionURI?: string;
    items?: ComicSummary[];

}
