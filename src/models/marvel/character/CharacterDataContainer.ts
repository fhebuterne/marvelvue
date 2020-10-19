import Character from "@/models/marvel/character/Character";
import CharacterResults from "@/models/marvel/character/CharacterResults";
import AbstractDataContainer from "@/models/marvel/base/AbstractDataContainer";

export default class CharacterDataContainer extends AbstractDataContainer<Character> {
    static entity = 'characterDataContainer'

    static fields() {
        return {
            id: this.uid(),
            offset: this.number(0),
            limit: this.number(20),
            total: this.number(0),
            count: this.number(0),
            results: this.belongsToMany(Character, CharacterResults, 'id', 'characterId'),
            marvelSearchParams: this.attr(null)
        }
    }
}
