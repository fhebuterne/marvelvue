import {Model} from "@vuex-orm/core";
import Url from "@/models/marvel/Url";

export default class Character extends Model {
    static entity = 'character'

    static fields () {
        return {
            id: this.uid(),
            name: this.string(''),
            description: this.string(''),
            modified: this.attr(null),
            resourceURI: this.string(''),
            urls: this.hasMany(Url, 'id'),
            thumbnail: this.string(''),
            comics: this.number(0),
            stories: this.number(0),
            events: this.number(0),
            series: this.number(0)
        }
    }

    id?: number;
    name?: string;
    description?: string;
    modified?: Date;
    resourceURI?: string;
    urls?: Url[];
    thumbnail?: string;
    comics?: number;
    stories?: number;
    events?: number;
    series?: number;

}
