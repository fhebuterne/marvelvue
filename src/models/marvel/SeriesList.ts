import {Model} from "@vuex-orm/core";
import SeriesSummary from "@/models/marvel/SeriesSummary";

export default class SeriesList extends Model {
    static entity = 'seriesList'

    static fields () {
        return {
            available: this.number(0),
            returned: this.number(0),
            collectionURI: this.string(""),
            items: this.hasMany(SeriesSummary, 'itemsSeriesSummary')
        }
    }

    available?: number;
    returned?: number;
    collectionURI?: string;
    items?: SeriesSummary[];

}
