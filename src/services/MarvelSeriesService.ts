import SerieDataContainer from "@/models/marvel/serie/SerieDataContainer";
import Serie from "@/models/marvel/serie/Serie";
import SerieResults from "@/models/marvel/serie/SerieResults";

class MarvelSeriesService {

    private readonly publicKey: string = process.env.VUE_APP_MARVEL_PUBLIC_KEY;
    private url = `/characters`;

    private resetVuex(): void {
        Serie.deleteAll();
        SerieResults.deleteAll();
        SerieDataContainer.deleteAll();
    }

    getSeriesByCharacter(characterId: string) {
        this.resetVuex();

        const currentUrl = `${this.url}/${characterId}/series?apikey=${this.publicKey}`
        return SerieDataContainer.api().get(`${currentUrl}`, {
            dataTransformer: (response) => {
                return response.data.data;
            }
        });
    }

}

export const marvelSeriesService = new MarvelSeriesService();
