import {Model} from "@vuex-orm/core";
import Character from "@/models/marvel/Character";
import CharacterResults from "@/models/marvel/CharacterResults";

export default class CharacterDataContainer extends Model {
    static entity = 'characterDataContainer'

    static fields () {
        return {
            id: this.uid(),
            offset: this.number(0),
            limit: this.number(20),
            total: this.number(0),
            count: this.number(0),
            results: this.belongsToMany(Character, CharacterResults, 'id', 'characterId')
        }
    }

    id?: string;
    offset?: number
    limit?: number
    total?: number
    count?: number
    results?: Character[]

}
