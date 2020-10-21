import Event from "@/models/marvel/event/Event";
import EventResults from "@/models/marvel/event/EventResults";
import EventDataContainer from "@/models/marvel/event/EventDataContainer";
import {EntityEnum} from "@/models/marvel/base/EntityEnum";
import {MarvelSearchParams} from "@/models/marvel/MarvelSearchParams";
import {Response} from "@vuex-orm/plugin-axios";
import {SearchParameters} from "@/models/base/SearchParameters";

class MarvelEventsService {

    private readonly publicKey: string = process.env.VUE_APP_MARVEL_PUBLIC_KEY;

    private resetVuex(): void {
        Event.deleteAll();
        EventResults.deleteAll();
        EventDataContainer.deleteAll();
    }

    getEventBy(entityEnum: EntityEnum, id: string, marvelSearchParams?: MarvelSearchParams): Promise<Response> {
        if (entityEnum == EntityEnum.CHARACTER) {
            return this.getEventsByCharacter(id, marvelSearchParams)
        }

        if (entityEnum == EntityEnum.SERIE) {
            return this.getEventsBySerie(id, marvelSearchParams)
        }

        if (entityEnum == EntityEnum.STORY) {
            return this.getEventsByStory(id, marvelSearchParams)
        }

        if (entityEnum == EntityEnum.COMIC) {
            return this.getEventsByComic(id, marvelSearchParams)
        }

        return this.getEventsByCharacter(id, marvelSearchParams)
    }

    private getBaseUrl(prefix: string, id: string, marvelSearchParams?: MarvelSearchParams) {
        let currentUrl = `/${prefix}/${id}/events?apikey=${this.publicKey}`
        if (marvelSearchParams) {
            currentUrl += "&" + SearchParameters.objToParams(marvelSearchParams);
        }
        return currentUrl;
    }

    getEvent(eventId: string) {
        this.resetVuex();

        const currentUrl = `/events/${eventId}?apikey=${this.publicKey}`
        return EventDataContainer.api().get(`${currentUrl}`, {
            dataTransformer: (response) => {
                response.data.data.results.forEach((result: Event, index: number) => {
                    if (response.data.data.results[index].thumbnail) {
                        response.data.data.results[index].thumbnail = response.data.data.results[index].thumbnail.path + "." + response.data.data.results[index].thumbnail.extension;
                    }
                });
                return response.data.data;
            }
        });
    }

    getEventsByCharacter(characterId: string, marvelSearchParams?: MarvelSearchParams) {
        this.resetVuex();

        return EventDataContainer.api().get(this.getBaseUrl("characters", characterId, marvelSearchParams), {
            dataTransformer: (response) => {
                return response.data.data;
            }
        });
    }

    getEventsByComic(comicId: string, marvelSearchParams?: MarvelSearchParams) {
        this.resetVuex();

        return EventDataContainer.api().get(this.getBaseUrl("comics", comicId, marvelSearchParams), {
            dataTransformer: (response) => {
                return response.data.data;
            }
        });
    }

    getEventsByStory(storyId: string, marvelSearchParams?: MarvelSearchParams) {
        this.resetVuex();

        return EventDataContainer.api().get(this.getBaseUrl("stories", storyId, marvelSearchParams), {
            dataTransformer: (response) => {
                return response.data.data;
            }
        });
    }

    getEventsBySerie(serieId: string, marvelSearchParams?: MarvelSearchParams) {
        this.resetVuex();

        return EventDataContainer.api().get(this.getBaseUrl("series", serieId, marvelSearchParams), {
            dataTransformer: (response) => {
                return response.data.data;
            }
        });
    }

}

export const marvelEventsService = new MarvelEventsService();
