import {Model} from "@vuex-orm/core";
import EventSummary from "@/models/marvel/EventSummary";

export default class EventList extends Model {
    static entity = 'eventList'

    static fields () {
        return {
            available: this.number(0),
            returned: this.number(0),
            collectionURI: this.string(''),
            items: this.hasMany(EventSummary, 'itemsEventSummary')
        }
    }

    available?: number;
    returned?: number;
    collectionURI?: string;
    items?: EventSummary[];

}
