import {Model} from "@vuex-orm/core";

export default class StoryResults extends Model {
    static entity = 'storyResults'

    static primaryKey = ['id', 'storyId']

    static fields () {
        return {
            id: this.attr(null),
            storyId: this.attr(null)
        }
    }
}
