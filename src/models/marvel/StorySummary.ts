import {Model} from "@vuex-orm/core";

export default class StorySummary extends Model {
    static entity = 'storySummary'

    static fields () {
        return {
            resourceURI: this.string(''),
            name: this.string(''),
            type: this.string('')
        }
    }

    resourceURI?: string;
    name?: string;
    type?: string;

}
