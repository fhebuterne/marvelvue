<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-3"></div>
      <div class="col">
        <h2>Serie</h2>
        <SerieRow v-if="serie" :serie="serie"></SerieRow>
      </div>
      <div class="col-3"></div>
    </div>

    <div class="row mb-4">
      <div class="col-6">
        <CardToggle>
          <template v-slot:header>
            Les personnages liés à la série <b>{{ serie?.name }}</b>
          </template>
          <template v-slot:body>
            <CharactersTable :characters="characters"></CharactersTable>
          </template>
        </CardToggle>
      </div>
      <div class="col-6">
        <CardToggle>
          <template v-slot:header>
            Les évènements liés à la série <b>{{ serie?.name }}</b>
          </template>
          <template v-slot:body>
            <EventsTable :events="events"></EventsTable>
          </template>
        </CardToggle>
      </div>
    </div>

    <div class="row">
      <div class="col-6">
        <CardToggle>
          <template v-slot:header>
            Les histoires liées à la série <b>{{ serie?.name }}</b>
          </template>
          <template v-slot:body>
            <StoriesTable :stories="stories"></StoriesTable>
          </template>
        </CardToggle>
      </div>

      <div class="col-6">
        <CardToggle>
          <template v-slot:header>
            Les comics liés à la série <b>{{ serie?.name }}</b>
          </template>
          <template v-slot:body>
            <ComicsTable :comics="comics"></ComicsTable>
          </template>
        </CardToggle>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import Event from "@/models/marvel/event/Event";
import CardToggle from "@/components/CardToggle.vue";
import EventsTable from "@/components/EventsTable.vue";
import SeriesTable from "@/components/SeriesTable.vue";
import {library} from "@fortawesome/fontawesome-svg-core";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";
import Story from "@/models/marvel/story/Story";
import CharactersTable from "@/components/CharactersTable.vue";
import Character from "@/models/marvel/character/Character";
import {marvelStoriesService} from "@/services/MarvelStoriesService";
import {marvelCharactersService} from "@/services/MarvelCharactersService";
import {marvelComicsService} from "@/services/MarvelComicsService";
import {marvelSeriesService} from "@/services/MarvelSeriesService";
import {marvelEventsService} from "@/services/MarvelEventsService";
import Comic from "@/models/marvel/comic/Comic";
import ComicsTable from "@/components/ComicsTable.vue";
import SerieRow from "@/components/entityRow/SerieRow.vue";
import SerieModel from "@/models/marvel/serie/Serie";
import StoriesTable from "@/components/StoriesTable.vue";

library.add(faSpinner)

@Options({
  components: {
    SerieRow,
    CardToggle,
    EventsTable,
    SeriesTable,
    CharactersTable,
    ComicsTable,
    StoriesTable
  }
})
export default class Serie extends Vue {

  mounted() {
    const serieId = this.$route.params.id.toString();
    marvelSeriesService.getSerie(serieId).catch(error => {
      if (error.response.status == 404) {
        this.$router.push("/notfound");
      }
    });
    marvelCharactersService.getCharactersBySerie(serieId);
    marvelComicsService.getComicsBySerie(serieId);
    marvelEventsService.getEventsBySerie(serieId);
    marvelStoriesService.getStoriesBySerie(serieId);
  }

  get serie() {
    return SerieModel.find(this.$route.params.id.toString());
  }

  get characters() {
    return Character.all();
  }

  get events() {
    return Event.all();
  }

  get stories() {
    return Story.all();
  }

  get comics() {
    return Comic.all();
  }

}
</script>

<style lang="scss">
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
{
  opacity: 0;
}
</style>
