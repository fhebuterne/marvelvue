import {Model} from "@vuex-orm/core";
import StorySummary from "@/models/marvel/StorySummary";

export default class StoryList extends Model {
    static entity = 'storyList'

    static fields () {
        return {
            available: this.number(0),
            returned: this.number(0),
            collectionURI: this.string(""),
            items: this.hasMany(StorySummary, 'itemsStorySummary')
        }
    }

    available?: number;
    returned?: number;
    collectionURI?: string;
    items?: StorySummary[];

}
