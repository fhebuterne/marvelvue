import {Model} from "@vuex-orm/core";

export default class EventSummary extends Model {
    static entity = 'eventSummary'

    static fields () {
        return {
            resourceURI: this.string(''),
            name: this.string('')
        }
    }

    resourceURI?: string;
    name?: string;

}
