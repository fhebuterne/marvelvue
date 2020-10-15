import {Model} from "@vuex-orm/core";
import Url from "@/models/marvel/Url";
import Image from "@/models/marvel/Image";
import ComicList from "@/models/marvel/ComicList";
import StoryList from "@/models/marvel/StoryList";
import EventList from "@/models/marvel/EventList";
import SeriesSummary from "@/models/marvel/SeriesSummary";
import CharacterSeries from "@/models/marvel/CharacterSeries";

export default class Character extends Model {
    static entity = 'character'

    static fields () {
        return {
            id: this.uid(),
            name: this.string(''),
            description: this.string(''),
            modified: this.string(''),
            resourceURI: this.string(''),
            urls: this.hasMany(Url, 'id'),
            thumbnails: this.hasOne(Image, 'id'),
            comics: this.hasMany(ComicList, 'id'),
            stories: this.hasMany(StoryList, 'id'),
            events: this.hasMany(EventList, 'id'),
            series: this.belongsToMany(SeriesSummary, CharacterSeries, 'characterId', 'serieId')
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
    series?: SeriesSummary[] = [];

}
