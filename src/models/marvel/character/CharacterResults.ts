import {Model} from "@vuex-orm/core";

export default class CharacterResults extends Model {
    static entity = 'characterResults'

    static primaryKey = ['id', 'character_id']

    static fields () {
        return {
            id: this.attr(null),
            characterId: this.attr(null)
        }
    }
}
