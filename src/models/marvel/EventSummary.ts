import {Model} from "@vuex-orm/core";

export default class EventSummary extends Model {
    static entity = 'eventSummary'

    static fields () {
        return {
            path: this.string(''),
            extension: this.string('')
        }
    }

    resourceURI?: string;
    name?: string;

}
