import Comic from "@/models/marvel/comic/Comic";
import ComicResults from "@/models/marvel/comic/ComicResults";
import ComicDataContainer from "@/models/marvel/comic/ComicDataContainer";

class MarvelComicsService {

    private readonly publicKey: string = process.env.VUE_APP_MARVEL_PUBLIC_KEY;
    private url = `/characters`;

    private resetVuex(): void {
        Comic.deleteAll();
        ComicResults.deleteAll();
        ComicDataContainer.deleteAll();
    }

    getComicsByCharacter(characterId: string) {
        this.resetVuex();

        const currentUrl = `${this.url}/${characterId}/comics?apikey=${this.publicKey}`
        return ComicDataContainer.api().get(`${currentUrl}`, {
            dataTransformer: (response) => {
                return response.data.data;
            }
        });
    }

}

export const marvelComicsService = new MarvelComicsService();
