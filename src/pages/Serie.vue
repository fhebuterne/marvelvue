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
            <EventsPaginated :id="serieId" :filterBy="'SERIE'"></EventsPaginated>
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
import CardToggle from "@/components/CardToggle.vue";
import {marvelSeriesService} from "@/services/MarvelSeriesService";
import SerieRow from "@/components/entityRow/SerieRow.vue";
import SerieModel from "@/models/marvel/serie/Serie";
import ComicsPaginated from "@/components/entityPaginated/ComicsPaginated.vue";
import StoriesPaginated from "@/components/entityPaginated/StoriesPaginated.vue";
import CharactersPaginated from "@/components/entityPaginated/CharactersPaginated.vue";
import EventsPaginated from "@/components/entityPaginated/EventsPaginated.vue";

@Options({
  components: {
    SerieRow,
    CardToggle,
    EventsPaginated,
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
  }

  get serie() {
    return SerieModel.find(this.$route.params.id.toString());
  }

  get serieId() {
    return this.$route.params.id.toString();
  }

}
</script>
