<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-3"></div>
      <div class="col">
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
        <div class="card">
          <div class="card-header">
            Les évènements liés au personnage <b>{{ character?.name }}</b>
          </div>
          <div class="card-body">
            <table class="table table-hover">
              <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Titre</th>
                <th scope="col">Description</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="event of events" :key="event.id">
                <th scope="row">{{ event.id }}</th>
                <td>{{ event.title }}</td>
                <td style="width:60%">{{ event.limitedDescription }}</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-6">
        <div class="card">
          <div class="card-header">
            Les séries liées au personnage <b>{{ character?.name }}</b>
          </div>
          <div class="card-body">
            <table class="table table-hover">
              <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Titre</th>
                <th scope="col">Description</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="serie of series" :key="serie.id">
                <th scope="row">{{ serie.id }}</th>
                <td>{{ serie.title }}</td>
                <td style="width:60%">{{ serie.limitedDescription }}</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div class="col-6">
        <div class="card">
          <div class="card-header">
            Les histoires liées au personnage <b>{{ character?.name }}</b>
          </div>
          <div class="card-body">
            <table class="table table-hover">
              <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Titre</th>
                <th scope="col">Description</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="story of stories" :key="story.id">
                <th scope="row">{{ story.id }}</th>
                <td>{{ story.title }}</td>
                <td style="width:60%">{{ story.limitedDescription }}</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import {library} from "@fortawesome/fontawesome-svg-core";
import {faAngleDown, faAngleUp} from "@fortawesome/free-solid-svg-icons";
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
import CharacterRow from "@/components/CharacterRow.vue";
import ComicsTable from "@/components/ComicsTable.vue";
import CardToggle from "@/components/CardToggle.vue";

library.add(faAngleDown)
library.add(faAngleUp)

@Options({
  components: {
    CharacterRow,
    ComicsTable,
    CardToggle
  }
})
export default class Character extends Vue {

  comicsOpened = true;

  mounted() {
    const characterId = this.$route.params.id.toString();
    marvelCharactersService.getCharacter(characterId);
    marvelComicsService.getComicsByCharacter(characterId);
    marvelEventsService.getEventsByCharacter(characterId);
    marvelSeriesService.getSeriesByCharacter(characterId);
    marvelStoriesService.getStoriesByCharacter(characterId);
  }

  toggleComics() {
    this.comicsOpened = !this.comicsOpened;
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
