import {Model} from "@vuex-orm/core";
import Character from "@/models/marvel/Character";

export default class CharacterDataContainer extends Model {
    static entity = 'characterDataContainer'

    static fields () {
        return {
            offset: this.number(0),
            limit: this.number(20),
            total: this.number(0),
            count: this.number(0),
            results: this.hasMany(Character, "id")
        }
    }

    offset?: number
    limit?: number
    total?: number
    count?: number
    results?: Character[]

}
