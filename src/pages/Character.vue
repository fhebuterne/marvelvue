<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-3"></div>
      <div class="col">
        <CharacterSelect :character="character"></CharacterSelect>
      </div>
      <div class="col-3"></div>
    </div>

    <div class="row mb-4">
      <div class="col-6">
        <div class="card">
          <div class="card-header">
            Comics
          </div>
          <div class="card-body">
            <p class="card-text">
              {{ comics }}
            </p>
          </div>
        </div>
      </div>
      <div class="col-6">
        <div class="card">
          <div class="card-header">
            Events
          </div>
          <div class="card-body">
            <p class="card-text">
              {{ events }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-6">
        <div class="card">
          <div class="card-header">
            Series
          </div>
          <div class="card-body">
            <p class="card-text">
              {{ series }}
            </p>
          </div>
        </div>
      </div>

      <div class="col-6">
        <div class="card">
          <div class="card-header">
            Stories
          </div>
          <div class="card-body">
            <p class="card-text">
              {{ stories }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import {library} from "@fortawesome/fontawesome-svg-core";
import {faSearch, faSpinner, faUserSecret} from "@fortawesome/free-solid-svg-icons";
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
import CharacterSelect from "@/components/CharacterSelect.vue";

library.add(faUserSecret)
library.add(faSearch)
library.add(faSpinner)

@Options({
  components: {
    CharacterSelect
  }
})
export default class Character extends Vue {

  mounted() {
    const characterId = this.$route.params.id.toString();
    marvelCharactersService.getCharacter(characterId);
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
