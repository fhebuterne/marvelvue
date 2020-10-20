import Comic from "@/models/marvel/comic/Comic";
import ComicResults from "@/models/marvel/comic/ComicResults";
import ComicDataContainer from "@/models/marvel/comic/ComicDataContainer";
import Character from "@/models/marvel/character/Character";

class MarvelComicsService {

    private readonly publicKey: string = process.env.VUE_APP_MARVEL_PUBLIC_KEY;

    private resetVuex(): void {
        Comic.deleteAll();
        ComicResults.deleteAll();
        ComicDataContainer.deleteAll();
    }

    getComic(comicId: string) {
        this.resetVuex();

        const currentUrl = `/comics/${comicId}?apikey=${this.publicKey}`
        return ComicDataContainer.api().get(`${currentUrl}`, {
            dataTransformer: (response) => {
                response.data.data.results.forEach((result: Character, index: number) => {
                    if (response.data.data.results[index].images.length > 0) {
                        response.data.data.results[index].thumbnail = response.data.data.results[index].images[0].path + "." + response.data.data.results[index].images[0].extension;
                    }
                });
                return response.data.data;
            }
        });
    }

    getComicsByCharacter(characterId: string) {
        this.resetVuex();

        const currentUrl = `/characters/${characterId}/comics?apikey=${this.publicKey}`
        return ComicDataContainer.api().get(`${currentUrl}`, {
            dataTransformer: (response) => {
                return response.data.data;
            }
        });
    }

    getComicsByStory(storyId: string) {
        this.resetVuex();

        const currentUrl = `/stories/${storyId}/comics?apikey=${this.publicKey}`
        return ComicDataContainer.api().get(`${currentUrl}`, {
            dataTransformer: (response) => {
                return response.data.data;
            }
        });
    }

}

export const marvelComicsService = new MarvelComicsService();
