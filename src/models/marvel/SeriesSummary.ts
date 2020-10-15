import {Model} from "@vuex-orm/core";

export default class SeriesSummary extends Model {
    static entity = 'seriesSummary'

    static fields () {
        return {
            resourceURI: this.string(''),
            name: this.string('')
        }
    }

    resourceURI?: string;
    name?: string;

}
