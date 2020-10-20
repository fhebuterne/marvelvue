<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-3"></div>
      <div class="col">
        <h2>Histoire</h2>
        <StoryRow v-if="story" :story="story"></StoryRow>
      </div>
      <div class="col-3"></div>
    </div>

    <div class="row mb-4">
      <div class="col-6">
        <CardToggle>
          <template v-slot:header>
            Les personnages liés à l'histoire <b>{{ story?.name }}</b>
          </template>
          <template v-slot:body>
            <CharactersTable :characters="characters"></CharactersTable>
          </template>
        </CardToggle>
      </div>
      <div class="col-6">
        <CardToggle>
          <template v-slot:header>
            Les évènements liés à l'histoire <b>{{ story?.name }}</b>
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
            Les séries liées à l'histoire <b>{{ story?.name }}</b>
          </template>
          <template v-slot:body>
            <SeriesTable :series="series"></SeriesTable>
          </template>
        </CardToggle>
      </div>

      <div class="col-6">
        <CardToggle>
          <template v-slot:header>
            Les comics liés à l'histoire <b>{{ story?.name }}</b>
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
import StoryModel from "@/models/marvel/story/Story";
import CharactersTable from "@/components/CharactersTable.vue";
import Character from "@/models/marvel/character/Character";
import StoryRow from "@/components/entityRow/StoryRow.vue";
import {marvelStoriesService} from "@/services/MarvelStoriesService";
import {marvelCharactersService} from "@/services/MarvelCharactersService";
import {marvelComicsService} from "@/services/MarvelComicsService";
import {marvelSeriesService} from "@/services/MarvelSeriesService";
import {marvelEventsService} from "@/services/MarvelEventsService";
import Serie from "@/models/marvel/serie/Serie";
import Comic from "@/models/marvel/comic/Comic";
import ComicsTable from "@/components/ComicsTable.vue";

library.add(faSpinner)

@Options({
  components: {
    StoryRow,
    CardToggle,
    EventsTable,
    SeriesTable,
    CharactersTable,
    ComicsTable
  }
})
export default class Story extends Vue {

  mounted() {
    const storyId = this.$route.params.id.toString();
    marvelStoriesService.getStory(storyId).catch(error => {
      if (error.response.status == 404) {
        this.$router.push("/notfound");
      }
    });
    marvelCharactersService.getCharactersByStory(storyId);
    marvelComicsService.getComicsByStory(storyId);
    marvelSeriesService.getSeriesByStory(storyId);
    marvelEventsService.getEventsByStory(storyId);
  }

  get story() {
    return StoryModel.find(this.$route.params.id.toString());
  }

  get characters() {
    return Character.all();
  }

  get events() {
    return Event.all();
  }

  get series() {
    return Serie.all();
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
