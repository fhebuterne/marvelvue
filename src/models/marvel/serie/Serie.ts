import Url from "@/models/marvel/Url";
import AbstractEntity from "@/models/marvel/base/AbstractEntity";

export default class Serie extends AbstractEntity<Serie> {
    static entity = 'serie'

    static fields() {
        return {
            id: this.uid(),
            title: this.string(''),
            description: this.string(''),
            modified: this.attr(null),
            resourceURI: this.string(''),
            urls: this.attr(null),
            startYear: this.number(0),
            endYear: this.number(0),
            rating: this.string(''),
            thumbnail: this.string('')
        }
    }

    title?: string;
    resourceURI?: string;
    urls?: Url[];
    startYear?: number;
    endYear?: number;
    rating?: string;
    thumbnail?: string;

}
