import {Model} from "@vuex-orm/core";
import PaginatedEntity from "@/models/base/PaginatedEntity";

export default class Story extends Model implements PaginatedEntity {
    static entity = 'story'

    static fields() {
        return {
            id: this.uid(),
            title: this.string(''),
            description: this.string(''),
            modified: this.attr(null),
            resourceURI: this.string(''),
            type: this.string('')
        }
    }

    id?: number;
    title?: string;
    description?: string;
    modified?: Date;
    resourceURI?: string;
    type?: string;

}
