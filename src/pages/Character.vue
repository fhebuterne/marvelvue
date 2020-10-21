<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-3"></div>
      <div class="col">
        <h2>Personnage</h2>
        <CharacterRow v-if="character" :character="character"></CharacterRow>
      </div>
      <div class="col-3"></div>
    </div>

    <div class="row mb-4">
      <div class="col-6">
        <CardToggle>
          <template v-slot:header>
            Les comics liés au personnage <b>{{ character?.name }}</b>
          </template>
          <template v-slot:body>
            <ComicsTable :comics="comics"></ComicsTable>
          </template>
        </CardToggle>
      </div>
      <div class="col-6">
        <CardToggle>
          <template v-slot:header>
            Les évènements liés au personnage <b>{{ character?.name }}</b>
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
            Les séries liées au personnage <b>{{ character?.name }}</b>
          </template>
          <template v-slot:body>
            <SeriesTable :series="series"></SeriesTable>
          </template>
        </CardToggle>
      </div>

      <div class="col-6">
        <CardToggle>
          <template v-slot:header>
            Les histoires liées au personnage <b>{{ character?.name }}</b>
          </template>
          <template v-slot:body>
            <StoriesTable :stories="stories"></StoriesTable>
          </template>
        </CardToggle>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import {marvelComicsService} from "@/services/MarvelComicsService";
import Comic from "@/models/marvel/comic/Comic";
import {marvelEventsService} from "@/services/MarvelEventsService";
import Event from "@/models/marvel/event/Event";
import {marvelSeriesService} from "@/services/MarvelSeriesService";
import Serie from "@/models/marvel/serie/Serie";
import {marvelStoriesService} from "@/services/MarvelStoriesService";
import Story from "@/models/marvel/story/Story";
import CharacterModel from "@/models/marvel/character/Character";
import {marvelCharactersService} from "@/services/MarvelCharactersService";
import ComicsTable from "@/components/entityTable/ComicsTable.vue";
import CardToggle from "@/components/CardToggle.vue";
import EventsTable from "@/components/entityTable/EventsTable.vue";
import SeriesTable from "@/components/entityTable/SeriesTable.vue";
import StoriesTable from "@/components/entityTable/StoriesTable.vue";
import {library} from "@fortawesome/fontawesome-svg-core";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";
import CharacterRow from "@/components/entityRow/CharacterRow.vue";

library.add(faSpinner)

@Options({
  components: {
    CharacterRow,
    CardToggle,
    ComicsTable,
    EventsTable,
    SeriesTable,
    StoriesTable
  }
})
export default class Character extends Vue {

  mounted() {
    const characterId = this.$route.params.id.toString();
    marvelCharactersService.getCharacter(characterId).catch(error => {
      if (error.response.status == 404) {
        this.$router.push("/notfound");
      }
    });
    marvelComicsService.getComicsByCharacter(characterId);
    marvelEventsService.getEventsByCharacter(characterId);
    marvelSeriesService.getSeriesByCharacter(characterId);
    marvelStoriesService.getStoriesByCharacter(characterId);
  }

  get character() {
    return CharacterModel.find(this.$route.params.id.toString());
  }

  get comics() {
    return Comic.all();
  }

  get events() {
    return Event.all();
  }

  get series() {
    return Serie.all();
  }

  get stories() {
    return Story.all();
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
