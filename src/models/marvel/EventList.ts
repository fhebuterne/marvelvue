import {Model} from "@vuex-orm/core";
import EventSummary from "@/models/marvel/EventSummary";

export default class EventList extends Model {
    static entity = 'eventList'

    static fields () {
        return {
            id: this.uid(),
            available: this.number(0),
            returned: this.number(0),
            collectionURI: this.string(''),
            items: this.hasMany(EventSummary, 'itemsEventSummary')
        }
    }

    id?: string;
    available?: number;
    returned?: number;
    collectionURI?: string;
    items?: EventSummary[];

}
