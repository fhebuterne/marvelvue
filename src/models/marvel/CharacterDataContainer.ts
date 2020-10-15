import {Model} from "@vuex-orm/core";
import Character from "@/models/marvel/Character";

export default class CharacterDataContainer extends Model {
    static entity = 'characterDataContainer'

    static fields () {
        return {
            code: this.uid(),
            name: this.string('')
        }
    }

    offset?: number
    limit?: number
    total?: number
    count?: number
    results?: Character[]

}
