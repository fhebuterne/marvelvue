import SerieDataContainer from "@/models/marvel/serie/SerieDataContainer";
import Serie from "@/models/marvel/serie/Serie";
import SerieResults from "@/models/marvel/serie/SerieResults";
import {EntityEnum} from "@/models/marvel/base/EntityEnum";
import {MarvelSearchParams} from "@/models/marvel/MarvelSearchParams";
import {Response} from "@vuex-orm/plugin-axios";
import {SearchParameters} from "@/models/base/SearchParameters";

class MarvelSeriesService {

    private readonly publicKey: string = process.env.VUE_APP_MARVEL_PUBLIC_KEY;

    private resetVuex(): void {
        Serie.deleteAll();
        SerieResults.deleteAll();
        SerieDataContainer.deleteAll();
    }

    getSerieBy(entityEnum: EntityEnum, id: string, marvelSearchParams?: MarvelSearchParams): Promise<Response> {
        if (entityEnum == EntityEnum.CHARACTER) {
            return this.getSeriesByCharacter(id, marvelSearchParams)
        }

        if (entityEnum == EntityEnum.STORY) {
            return this.getSeriesByStory(id, marvelSearchParams)
        }

        if (entityEnum == EntityEnum.EVENT) {
            return this.getSeriesByEvent(id, marvelSearchParams)
        }

        return this.getSeriesByCharacter(id, marvelSearchParams)
    }

    private getBaseUrl(prefix: string, id: string, marvelSearchParams?: MarvelSearchParams) {
        let currentUrl = `/${prefix}/${id}/series?apikey=${this.publicKey}`
        if (marvelSearchParams) {
            currentUrl += "&" + SearchParameters.objToParams(marvelSearchParams);
        }
        return currentUrl;
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

    getSeriesByCharacter(characterId: string, marvelSearchParams?: MarvelSearchParams) {
        this.resetVuex();

        return SerieDataContainer.api().get(this.getBaseUrl("characters", characterId, marvelSearchParams), {
            dataTransformer: (response) => {
                return response.data.data;
            }
        });
    }

    getSeriesByStory(storyId: string, marvelSearchParams?: MarvelSearchParams) {
        this.resetVuex();

        return SerieDataContainer.api().get(this.getBaseUrl("stories", storyId, marvelSearchParams), {
            dataTransformer: (response) => {
                return response.data.data;
            }
        });
    }

    getSeriesByEvent(eventId: string, marvelSearchParams?: MarvelSearchParams) {
        this.resetVuex();

        return SerieDataContainer.api().get(this.getBaseUrl("events", eventId, marvelSearchParams), {
            dataTransformer: (response) => {
                return response.data.data;
            }
        });
    }

}

export const marvelSeriesService = new MarvelSeriesService();
