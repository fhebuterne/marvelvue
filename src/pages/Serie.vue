<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-3"></div>
      <div class="col">
        <h2 class="text-center text-white">Serie</h2>
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
            <CharactersPaginated :id="serieId" :filterBy="'SERIE'"></CharactersPaginated>
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
            <StoriesPaginated :id="serieId" :filterBy="'SERIE'"></StoriesPaginated>
          </template>
        </CardToggle>
      </div>

      <div class="col-6">
        <CardToggle>
          <template v-slot:header>
            Les comics liés à la série <b>{{ serie?.name }}</b>
          </template>
          <template v-slot:body>
            <ComicsPaginated :id="serieId" :filterBy="'SERIE'"></ComicsPaginated>
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
import {marvelSeriesService} from "@/services/MarvelSeriesService";
import {marvelEventsService} from "@/services/MarvelEventsService";
import SerieRow from "@/components/entityRow/SerieRow.vue";
import SerieModel from "@/models/marvel/serie/Serie";
import ComicsPaginated from "@/components/entityPaginated/ComicsPaginated.vue";
import StoriesPaginated from "@/components/entityPaginated/StoriesPaginated.vue";
import CharactersPaginated from "@/components/entityPaginated/CharactersPaginated.vue";

library.add(faSpinner)

@Options({
  components: {
    SerieRow,
    CardToggle,
    EventsTable,
    SeriesTable,
    CharactersPaginated,
    StoriesPaginated,
    ComicsPaginated
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
    marvelEventsService.getEventsBySerie(serieId);
  }

  get serie() {
    return SerieModel.find(this.$route.params.id.toString());
  }

  get serieId() {
    return this.$route.params.id.toString();
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
