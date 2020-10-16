import {Model} from "@vuex-orm/core";
import Url from "@/models/marvel/Url";
import PaginatedEntity from "@/models/base/PaginatedEntity";

export default class Serie extends Model implements PaginatedEntity {
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
            rating: this.string('')
        }
    }

    id?: number;
    title?: string;
    description?: string;
    modified?: Date;
    resourceURI?: string;
    urls?: Url[];
    startYear?: number;
    endYear?: number;
    rating?: string;

}
