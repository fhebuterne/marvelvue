import {Model} from "@vuex-orm/core";
import CharacterDataContainer from "@/models/marvel/character/CharacterDataContainer";

export default class CharacterDataWrapper extends Model {
    static entity = 'characterDataWrapper'

    static fields () {
        return {
            code: this.number(404),
            status: this.string(''),
            copyright: this.string(''),
            attributionText: this.string(''),
            attributionHTML: this.string(''),
            data: this.belongsTo(CharacterDataContainer, "dataId"),
            dataId: this.attr('')
        }
    }

    code?: number
    status?: string
    copyright?: string
    attributionText?: string
    attributionHTML?: string
    data?: CharacterDataContainer
    dataId?: number
    etag?: string

}
