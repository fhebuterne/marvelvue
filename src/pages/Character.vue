<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-3"></div>
      <div class="col">
        <h2 class="text-center text-white">Personnage</h2>
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
            <ComicsPaginated :id="characterId" :filterBy="'CHARACTER'"></ComicsPaginated>
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
            <SeriesPaginated :id="characterId" :filterBy="'CHARACTER'"></SeriesPaginated>
          </template>
        </CardToggle>
      </div>

      <div class="col-6">
        <CardToggle>
          <template v-slot:header>
            Les histoires liées au personnage <b>{{ character?.name }}</b>
          </template>
          <template v-slot:body>
            <StoriesPaginated :id="characterId" :filterBy="'CHARACTER'"></StoriesPaginated>
          </template>
        </CardToggle>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import {marvelEventsService} from "@/services/MarvelEventsService";
import Event from "@/models/marvel/event/Event";
import CharacterModel from "@/models/marvel/character/Character";
import {marvelCharactersService} from "@/services/MarvelCharactersService";
import CardToggle from "@/components/CardToggle.vue";
import EventsTable from "@/components/entityTable/EventsTable.vue";
import {library} from "@fortawesome/fontawesome-svg-core";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";
import CharacterRow from "@/components/entityRow/CharacterRow.vue";
import ComicsPaginated from "@/components/entityPaginated/ComicsPaginated.vue";
import SeriesPaginated from "@/components/entityPaginated/SeriesPaginated.vue";
import StoriesPaginated from "@/components/entityPaginated/StoriesPaginated.vue";

library.add(faSpinner)

@Options({
  components: {
    CharacterRow,
    CardToggle,
    ComicsPaginated,
    SeriesPaginated,
    EventsTable,
    StoriesPaginated
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
    marvelEventsService.getEventsByCharacter(characterId);
  }

  get characterId() {
    return this.$route.params.id.toString();
  }

  get character() {
    return CharacterModel.find(this.$route.params.id.toString());
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
