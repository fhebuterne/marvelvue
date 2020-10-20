import Event from "@/models/marvel/event/Event";
import EventResults from "@/models/marvel/event/EventResults";
import EventDataContainer from "@/models/marvel/event/EventDataContainer";

class MarvelEventsService {

    private readonly publicKey: string = process.env.VUE_APP_MARVEL_PUBLIC_KEY;

    private resetVuex(): void {
        Event.deleteAll();
        EventResults.deleteAll();
        EventDataContainer.deleteAll();
    }

    getEventsByCharacter(characterId: string) {
        this.resetVuex();

        const currentUrl = `/characters/${characterId}/events?apikey=${this.publicKey}`
        return EventDataContainer.api().get(`${currentUrl}`, {
            dataTransformer: (response) => {
                return response.data.data;
            }
        });
    }

    getEventsByComic(comicId: string) {
        this.resetVuex();

        const currentUrl = `/comics/${comicId}/events?apikey=${this.publicKey}`
        return EventDataContainer.api().get(`${currentUrl}`, {
            dataTransformer: (response) => {
                return response.data.data;
            }
        });
    }

}

export const marvelEventsService = new MarvelEventsService();
