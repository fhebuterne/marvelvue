import Story from "@/models/marvel/story/Story";
import StoryResults from "@/models/marvel/story/StoryResults";
import StoryDataContainer from "@/models/marvel/story/StoryDataContainer";

class MarvelStoriesService {

    private readonly publicKey: string = process.env.VUE_APP_MARVEL_PUBLIC_KEY;
    private url = `/characters`;

    private resetVuex(): void {
        Story.deleteAll();
        StoryResults.deleteAll();
        StoryDataContainer.deleteAll();
    }

    getStoriesByCharacter(characterId: string) {
        this.resetVuex();

        const currentUrl = `${this.url}/${characterId}/stories?apikey=${this.publicKey}`
        return StoryDataContainer.api().get(`${currentUrl}`, {
            dataTransformer: (response) => {
                return response.data.data;
            }
        });
    }

}

export const marvelStoriesService = new MarvelStoriesService();
