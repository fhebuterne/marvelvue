import AbstractDataContainer from "@/models/marvel/base/AbstractDataContainer";
import Event from "@/models/marvel/event/Event";
import EventResults from "@/models/marvel/event/EventResults";

export default class EventDataContainer extends AbstractDataContainer<Event> {
    static entity = 'eventDataContainer'

    static fields() {
        return {
            id: this.uid(),
            offset: this.number(0),
            limit: this.number(20),
            total: this.number(0),
            count: this.number(0),
            results: this.belongsToMany(Event, EventResults, 'id', 'eventId')
        }
    }

}
