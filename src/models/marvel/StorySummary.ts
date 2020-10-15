import {Model} from "@vuex-orm/core";

export default class StorySummary extends Model {
    static entity = 'storySummary'

    static fields () {
        return {
            path: this.string(''),
            extension: this.string('')
        }
    }

    resourceURI?: string;
    name?: string;
    type?: string;

}
