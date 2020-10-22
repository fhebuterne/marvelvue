<template>
  <SeriesTable :series="series" v-if="!loading && !error"></SeriesTable>
  <font-awesome-icon :icon="['fas', 'spinner']" :size="'4x'" spin v-if="loading"/>
  <div class="alert alert-danger" role="alert" v-if="error && !loading">
    Une erreur s'est produite lors de l'appel d'API.
  </div>
  <PaginationRow v-model:paginatedResults="paginatedResults"
                 :textStyle="'text-dark'"
                 @updatepaginationevent="updatedPagination($event)"></PaginationRow>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import PaginatedResults from "@/models/base/PaginatedResults";
import PaginatedEntity from "@/models/base/PaginatedEntity";
import PaginationRow from "@/components/PaginationRow.vue";
import {library} from "@fortawesome/fontawesome-svg-core";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";
import SeriesTable from "@/components/entityTable/SeriesTable.vue";
import {marvelSeriesService} from "@/services/MarvelSeriesService";
import Serie from "@/models/marvel/serie/Serie";
import SerieDataContainer from "@/models/marvel/serie/SerieDataContainer";
import AbstractPaginated from "@/components/entityPaginated/AbstractPaginated.vue";

library.add(faSpinner);

@Options({
  components: {
    SeriesTable,
    PaginationRow
  }
})
export default class SeriesPaginated extends AbstractPaginated {

  callApiMarvel(init: boolean) {
    this.loading = true;
    this.error = false;
    marvelSeriesService.getSerieBy(this.filterBy, this.id, this.paginatedResults.marvelSearchParams).then(() => {
      const paginatedResults = SerieDataContainer.query().with("results").limit(1).first() as PaginatedResults<PaginatedEntity>;
      if (this.paginatedResults) {
        this.paginatedResults.offset = paginatedResults.offset;
        this.paginatedResults.results = paginatedResults.results;
      }
      if (init) {
        this.paginatedResults = paginatedResults;
      }
    }).catch(reason => {
      this.error = true;
    }).finally(() => {
      this.loading = false;
    });
  }

  get series() {
    return Serie.all();
  }

}
</script>
