import {Model} from "@vuex-orm/core";
import Url from "@/models/marvel/Url";
import PaginatedEntity from "@/models/base/PaginatedEntity";

export default class Comic extends Model implements PaginatedEntity {
    static entity = 'comic'

    static fields() {
        return {
            id: this.uid(),
            digitalId: this.number(0),
            title: this.string(''),
            issueNumber: this.number(0),
            variantDescription: this.string(''),
            description: this.string(''),
            modified: this.attr(null),
            isbn: this.string(''),
            upc: this.string(''),
            diamondCode: this.string(''),
            ean: this.string(''),
            issn: this.string(''),
            pageCount: this.number(0)
        }
    }

    id?: number;
    digitalId?: number;
    title?: string;
    issueNumber?: number;
    variantDescription?: string;
    description?: string;
    modified?: Date;
    isbn?: string;
    upc?: string;
    diamondCode?: string;
    ean?: string;
    issn?: string;
    pageCount?: number;
    //textObjects?: string;
    resourceURI?: string;
    urls?: Url[];

}
