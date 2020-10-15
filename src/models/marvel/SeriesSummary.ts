import {Model} from "@vuex-orm/core";

export default class SeriesSummary extends Model {
    static entity = 'seriesSummary'

    static fields () {
        return {
            id: this.attr(null),
            resourceURI: this.string(''),
            name: this.string('')
        }
    }

    id?: number;
    resourceURI?: string;
    name?: string;

}
