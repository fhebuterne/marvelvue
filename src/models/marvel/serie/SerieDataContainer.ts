import AbstractDataContainer from "@/models/marvel/base/AbstractDataContainer";
import Serie from "@/models/marvel/serie/Serie";
import SerieResults from "@/models/marvel/serie/SerieResults";

export default class SerieDataContainer extends AbstractDataContainer<Serie> {
    static entity = 'serieDataContainer'

    static fields() {
        return {
            id: this.uid(),
            offset: this.number(0),
            limit: this.number(20),
            total: this.number(0),
            count: this.number(0),
            results: this.belongsToMany(Serie, SerieResults, 'id', 'serieId')
        }
    }

}
