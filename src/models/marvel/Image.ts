import {Model} from "@vuex-orm/core";

export default class Image extends Model {
    static entity = 'image'

    static fields () {
        return {
            path: this.string(''),
            extension: this.string('')
        }
    }

    path?: string;
    extension?: string;

}
