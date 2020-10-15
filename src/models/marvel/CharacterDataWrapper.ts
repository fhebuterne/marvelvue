import {Model} from "@vuex-orm/core";

export default class CharacterDataWrapper extends Model {
    static entity = 'characterDataWrapper'

    static fields () {
        return {
            code: this.uid(),
            name: this.string('')
        }
    }

    code?: number
    status?: string
    copyright?: string
    attributionText?: string
    attributionHTML?: string
    data?: string
    etag?: string

}
