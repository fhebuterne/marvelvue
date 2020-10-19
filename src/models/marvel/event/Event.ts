import Url from "@/models/marvel/Url";
import AbstractEntity from "@/models/marvel/base/AbstractEntity";

export default class Event extends AbstractEntity<Event> {
    static entity = 'event'

    static fields() {
        return {
            id: this.uid(),
            title: this.string(''),
            description: this.string(''),
            modified: this.attr(null),
            resourceURI: this.string(''),
            urls: this.attr(null)
        }
    }

    title?: string;
    resourceURI?: string;
    urls?: Url[];


}
