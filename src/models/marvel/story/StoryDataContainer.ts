import AbstractDataContainer from "@/models/marvel/base/AbstractDataContainer";
import Story from "@/models/marvel/story/Story";
import StoryResults from "@/models/marvel/story/StoryResults";

export default class StoryDataContainer extends AbstractDataContainer<Story> {
    static entity = 'storyDataContainer'

    static fields() {
        return {
            id: this.uid(),
            offset: this.number(0),
            limit: this.number(20),
            total: this.number(0),
            count: this.number(0),
            results: this.belongsToMany(Story, StoryResults, 'id', 'storyId')
        }
    }

}
