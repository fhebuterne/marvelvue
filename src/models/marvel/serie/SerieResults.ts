import {Model} from "@vuex-orm/core";

export default class SerieResults extends Model {
    static entity = 'serieResults'

    static primaryKey = ['id', 'serieId']

    static fields () {
        return {
            id: this.attr(null),
            serieId: this.attr(null)
        }
    }
}
