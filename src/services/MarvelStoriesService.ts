import Story from "@/models/marvel/story/Story";
import StoryResults from "@/models/marvel/story/StoryResults";
import StoryDataContainer from "@/models/marvel/story/StoryDataContainer";
import Character from "@/models/marvel/character/Character";

class MarvelStoriesService {

    private readonly publicKey: string = process.env.VUE_APP_MARVEL_PUBLIC_KEY;

    private resetVuex(): void {
        Story.deleteAll();
        StoryResults.deleteAll();
        StoryDataContainer.deleteAll();
    }

    getStory(storyId: string) {
        this.resetVuex();

        const currentUrl = `/stories/${storyId}?apikey=${this.publicKey}`
        return StoryDataContainer.api().get(`${currentUrl}`, {
            dataTransformer: (response) => {
                response.data.data.results.forEach((result: Character, index: number) => {
                    if (response.data.data.results[index].thumbnail) {
                        response.data.data.results[index].thumbnail = response.data.data.results[index].thumbnail.path + "." + response.data.data.results[index].thumbnail.extension;
                    }
                });

                return response.data.data;
            }
        });
    }

    getStoriesByCharacter(characterId: string) {
        this.resetVuex();

        const currentUrl = `/characters/${characterId}/stories?apikey=${this.publicKey}`
        return StoryDataContainer.api().get(`${currentUrl}`, {
            dataTransformer: (response) => {
                return response.data.data;
            }
        });
    }

    getStoriesByComic(comicId: string) {
        this.resetVuex();

        const currentUrl = `/comics/${comicId}/stories?apikey=${this.publicKey}`
        return StoryDataContainer.api().get(`${currentUrl}`, {
            dataTransformer: (response) => {
                return response.data.data;
            }
        });
    }

}

export const marvelStoriesService = new MarvelStoriesService();
