import SerieDataContainer from "@/models/marvel/serie/SerieDataContainer";
import Serie from "@/models/marvel/serie/Serie";
import SerieResults from "@/models/marvel/serie/SerieResults";

class MarvelSeriesService {

    private readonly publicKey: string = process.env.VUE_APP_MARVEL_PUBLIC_KEY;

    private resetVuex(): void {
        Serie.deleteAll();
        SerieResults.deleteAll();
        SerieDataContainer.deleteAll();
    }

    getSerie(serieId: string) {
        this.resetVuex();

        const currentUrl = `/series/${serieId}?apikey=${this.publicKey}`
        return SerieDataContainer.api().get(`${currentUrl}`, {
            dataTransformer: (response) => {
                response.data.data.results.forEach((result: Serie, index: number) => {
                    if (response.data.data.results[index].thumbnail) {
                        response.data.data.results[index].thumbnail = response.data.data.results[index].thumbnail.path + "." + response.data.data.results[index].thumbnail.extension;
                    }
                });

                return response.data.data;
            }
        });
    }

    getSeriesByCharacter(characterId: string) {
        this.resetVuex();

        const currentUrl = `/characters/${characterId}/series?apikey=${this.publicKey}`
        return SerieDataContainer.api().get(`${currentUrl}`, {
            dataTransformer: (response) => {
                return response.data.data;
            }
        });
    }

    getSeriesByStory(storyId: string) {
        this.resetVuex();

        const currentUrl = `/stories/${storyId}/series?apikey=${this.publicKey}`
        return SerieDataContainer.api().get(`${currentUrl}`, {
            dataTransformer: (response) => {
                return response.data.data;
            }
        });
    }

}

export const marvelSeriesService = new MarvelSeriesService();
