import {Model} from "@vuex-orm/core";
import Url from "@/models/marvel/Url";
import Image from "@/models/marvel/Image";
import ComicList from "@/models/marvel/ComicList";
import StoryList from "@/models/marvel/StoryList";
import EventList from "@/models/marvel/EventList";
import SeriesList from "@/models/marvel/SeriesList";

export default class Character extends Model {
    static entity = 'character'

    static fields () {
        return {
            id: this.uid(),
            name: this.string(''),
            description: this.string(''),
            modified: this.string(''),
            resourceURI: this.string(''),
            urls: this.string('')
        }
    }

    id?: number;
    name?: string;
    description?: string;
    modified?: Date;
    resourceURI?: string;
    urls?: Url[];
    thumbnail?: Image;
    comics?: ComicList;
    stories?: StoryList;
    events?: EventList;
    series?: SeriesList;

}
