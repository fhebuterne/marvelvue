import AbstractEntity from "@/models/marvel/base/AbstractEntity";

export default class Story extends AbstractEntity<Story> {
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

    title?: string;
    resourceURI?: string;
    type?: string;
    thumbnail?: string;

}
