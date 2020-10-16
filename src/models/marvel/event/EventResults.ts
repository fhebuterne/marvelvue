import {Model} from "@vuex-orm/core";

export default class EventResults extends Model {
    static entity = 'eventResults'

    static primaryKey = ['id', 'eventId']

    static fields () {
        return {
            id: this.attr(null),
            eventId: this.attr(null)
        }
    }
}
