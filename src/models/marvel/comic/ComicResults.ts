import {Model} from "@vuex-orm/core";

export default class ComicResults extends Model {
    static entity = 'comicResults'

    static primaryKey = ['id', 'comicId']

    static fields () {
        return {
            id: this.attr(null),
            comicId: this.attr(null)
        }
    }
}
