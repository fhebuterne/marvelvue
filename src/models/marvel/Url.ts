import {Model} from "@vuex-orm/core";

export default class Url extends Model {
    static entity = 'url'

    static fields () {
        return {
            type: this.string(''),
            url: this.string('')
        }
    }

    type?: string;
    url?: string;

}
