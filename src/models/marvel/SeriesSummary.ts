import {Model} from "@vuex-orm/core";

export default class SeriesSummary extends Model {
    static entity = 'seriesSummary'

    static fields () {
        return {
            path: this.string(''),
            extension: this.string('')
        }
    }

    resourceURI?: string;
    name?: string;

}
