<template>
  <ComicsTable :comics="comics" v-if="!loading && !error"></ComicsTable>
  <font-awesome-icon :icon="['fas', 'spinner']" :size="'4x'" spin v-if="loading"/>
  <div class="alert alert-danger" role="alert" v-if="error && !loading">
    Une erreur s'est produite lors de l'appel d'API.
  </div>
  <PaginationRow v-model:paginatedResults="paginatedResultsComics"
                 :textStyle="'text-dark'"
                 @updatepaginationevent="updatedPagination($event)"></PaginationRow>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import {Prop} from "vue-property-decorator";
import PaginatedResults from "@/models/base/PaginatedResults";
import PaginatedEntity from "@/models/base/PaginatedEntity";
import PaginatedResultsImpl from "@/models/base/PaginatedResultsImpl";
import {MarvelSearchParams} from "@/models/marvel/MarvelSearchParams";
import {marvelComicsService} from "@/services/MarvelComicsService";
import ComicDataContainer from "@/models/marvel/comic/ComicDataContainer";
import {EntityEnum} from "@/models/marvel/base/EntityEnum";
import PaginationRow from "@/components/PaginationRow.vue";
import Comic from "@/models/marvel/comic/Comic";
import ComicsTable from "@/components/entityTable/ComicsTable.vue";
import {library} from "@fortawesome/fontawesome-svg-core";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";

library.add(faSpinner);

@Options({
  components: {
    ComicsTable,
    PaginationRow
  }
})
export default class ComicsPaginated extends Vue {

  paginatedResultsComics: PaginatedResults<PaginatedEntity> = new PaginatedResultsImpl();

  @Prop()
  filterBy = EntityEnum.CHARACTER;

  @Prop()
  id = '';

  loading = false;
  error = false;

  mounted() {
    this.loading = true;
    this.error = false;
    marvelComicsService.getComicBy(this.filterBy, this.id, this.paginatedResultsComics.marvelSearchParams).then(() => {
      const paginatedResults = ComicDataContainer.query().with("results").limit(1).first() as PaginatedResults<PaginatedEntity>;
      if (this.paginatedResultsComics) {
        this.paginatedResultsComics.offset = paginatedResults.offset;
        this.paginatedResultsComics.results = paginatedResults.results;
        this.paginatedResultsComics.currentPage = paginatedResults.currentPage;
      }
      this.paginatedResultsComics = paginatedResults;
    }).catch(reason => {
      this.error = true;
    }).finally(() => {
      this.loading = false;
    });
  }

  updatedPagination(paginatedResults: PaginatedResults<PaginatedEntity>) {
    this.paginatedResultsComics = paginatedResults;

    if (!this.paginatedResultsComics.marvelSearchParams) {
      this.paginatedResultsComics.marvelSearchParams = new MarvelSearchParams();
    }

    if (this.paginatedResultsComics.offset) {
      this.paginatedResultsComics.marvelSearchParams.offset = this.paginatedResultsComics.offset;
    }

    this.loading = true;
    this.error = false;
    marvelComicsService.getComicBy(this.filterBy, this.id, this.paginatedResultsComics.marvelSearchParams).then(() => {
      const paginatedResults = ComicDataContainer.query().with("results").limit(1).first() as PaginatedResults<PaginatedEntity>;
      if (this.paginatedResultsComics) {
        this.paginatedResultsComics.offset = paginatedResults.offset;
        this.paginatedResultsComics.results = paginatedResults.results;
      }
    }).catch(reason => {
      this.error = true;
    }).finally(() => {
      this.loading = false;
    });
  }

  get comics() {
    return Comic.all();
  }

}
</script>

<style lang="scss">
tr {
  cursor: pointer;
}
</style>
