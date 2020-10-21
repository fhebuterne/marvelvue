<template>
  <EventsTable :events="events" v-if="!loading && !error"></EventsTable>
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
import {EntityEnum} from "@/models/marvel/base/EntityEnum";
import PaginationRow from "@/components/PaginationRow.vue";
import {library} from "@fortawesome/fontawesome-svg-core";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";
import EventsTable from "@/components/entityTable/EventsTable.vue";
import Event from "@/models/marvel/event/Event";
import {marvelEventsService} from "@/services/MarvelEventsService";
import EventDataContainer from "@/models/marvel/event/EventDataContainer";

library.add(faSpinner);

@Options({
  components: {
    EventsTable,
    PaginationRow
  }
})
export default class EventsPaginated extends Vue {

  paginatedResultsComics: PaginatedResults<PaginatedEntity> = new PaginatedResultsImpl();

  @Prop()
  filterBy = EntityEnum.CHARACTER;

  @Prop()
  id = '';

  loading = false;
  error = false;

  mounted() {
    this.callApiMarvel(true);
  }

  updatedPagination(paginatedResults: PaginatedResults<PaginatedEntity>) {
    this.paginatedResultsComics = paginatedResults;

    if (!this.paginatedResultsComics.marvelSearchParams) {
      this.paginatedResultsComics.marvelSearchParams = new MarvelSearchParams();
    }

    if (this.paginatedResultsComics.offset) {
      this.paginatedResultsComics.marvelSearchParams.offset = this.paginatedResultsComics.offset;
    }

    this.callApiMarvel(false);
  }

  callApiMarvel(init: boolean) {
    this.loading = true;
    this.error = false;
    marvelEventsService.getEventBy(this.filterBy, this.id, this.paginatedResultsComics.marvelSearchParams).then(() => {
      const paginatedResults = EventDataContainer.query().with("results").limit(1).first() as PaginatedResults<PaginatedEntity>;
      if (this.paginatedResultsComics) {
        this.paginatedResultsComics.offset = paginatedResults.offset;
        this.paginatedResultsComics.results = paginatedResults.results;
      }
      if (init) {
        this.paginatedResultsComics = paginatedResults;
      }
    }).catch(reason => {
      this.error = true;
    }).finally(() => {
      this.loading = false;
    });
  }

  get events() {
    return Event.all();
  }

}
</script>

<style lang="scss">
tr {
  cursor: pointer;
}
</style>
