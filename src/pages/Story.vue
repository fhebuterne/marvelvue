<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-3"></div>
      <div class="col">
        <h2 class="text-center text-white">Histoire</h2>
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
            <SeriesPaginated :id="storyId" :filterBy="'STORY'"></SeriesPaginated>
          </template>
        </CardToggle>
      </div>

      <div class="col-6">
        <CardToggle>
          <template v-slot:header>
            Les comics liés à l'histoire <b>{{ story?.name }}</b>
          </template>
          <template v-slot:body>
            <ComicsPaginated :id="storyId" :filterBy="'STORY'"></ComicsPaginated>
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
import EventsTable from "@/components/entityTable/EventsTable.vue";
import SeriesTable from "@/components/entityTable/SeriesTable.vue";
import {library} from "@fortawesome/fontawesome-svg-core";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";
import StoryModel from "@/models/marvel/story/Story";
import CharactersTable from "@/components/entityTable/CharactersTable.vue";
import Character from "@/models/marvel/character/Character";
import StoryRow from "@/components/entityRow/StoryRow.vue";
import {marvelStoriesService} from "@/services/MarvelStoriesService";
import {marvelCharactersService} from "@/services/MarvelCharactersService";
import {marvelEventsService} from "@/services/MarvelEventsService";
import ComicsPaginated from "@/components/entityPaginated/ComicsPaginated.vue";
import SeriesPaginated from "@/components/entityPaginated/SeriesPaginated.vue";

library.add(faSpinner)

@Options({
  components: {
    StoryRow,
    CardToggle,
    EventsTable,
    SeriesTable,
    CharactersTable,
    ComicsPaginated,
    SeriesPaginated
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
    marvelEventsService.getEventsByStory(storyId);
  }

  get storyId() {
    return this.$route.params.id.toString();
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
