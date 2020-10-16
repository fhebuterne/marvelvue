import AbstractDataContainer from "@/models/marvel/base/AbstractDataContainer";
import Comic from "@/models/marvel/comic/Comic";
import ComicResults from "@/models/marvel/comic/ComicResults";

export default class ComicDataContainer extends AbstractDataContainer<Comic> {
    static entity = 'comicDataContainer'

    static fields() {
        return {
            id: this.uid(),
            offset: this.number(0),
            limit: this.number(20),
            total: this.number(0),
            count: this.number(0),
            results: this.belongsToMany(Comic, ComicResults, 'id', 'comicId')
        }
    }

}
