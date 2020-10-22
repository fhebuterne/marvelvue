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
            <CharactersPaginated :id="storyId" :filterBy="'STORY'"></CharactersPaginated>
          </template>
        </CardToggle>
      </div>
      <div class="col-6">
        <CardToggle>
          <template v-slot:header>
            Les évènements liés à l'histoire <b>{{ story?.name }}</b>
          </template>
          <template v-slot:body>
            <EventsPaginated :id="storyId" :filterBy="'STORY'"></EventsPaginated>
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
import CardToggle from "@/components/CardToggle.vue";
import StoryModel from "@/models/marvel/story/Story";
import StoryRow from "@/components/entityRow/StoryRow.vue";
import {marvelStoriesService} from "@/services/MarvelStoriesService";
import ComicsPaginated from "@/components/entityPaginated/ComicsPaginated.vue";
import SeriesPaginated from "@/components/entityPaginated/SeriesPaginated.vue";
import CharactersPaginated from "@/components/entityPaginated/CharactersPaginated.vue";
import EventsPaginated from "@/components/entityPaginated/EventsPaginated.vue";

@Options({
  components: {
    StoryRow,
    CardToggle,
    EventsPaginated,
    CharactersPaginated,
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
  }

  get storyId() {
    return this.$route.params.id.toString();
  }

  get story() {
    return StoryModel.find(this.$route.params.id.toString());
  }

}
</script>
