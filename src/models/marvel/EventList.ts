import {Model} from "@vuex-orm/core";
import ComicSummary from "@/models/marvel/ComicSummary";
import EventSummary from "@/models/marvel/EventSummary";

export default class EventList extends Model {
    static entity = 'eventList'

    static fields () {
        return {
            available: this.number(0),
            returned: this.number(0)
        }
    }

    available?: number;
    returned?: number;
    collectionURI?: string;
    items?: EventSummary[];

}
