import {Model} from "@vuex-orm/core";

export default class CharacterSeries extends Model {
    static entity = 'characterSeries'

    static primaryKey = ['characterId', 'serieId']

    static fields () {
        return {
            characterId: this.attr(null),
            serieId: this.attr(null)
        }
    }

    serieId?: number;
    characterId?: number;
}
