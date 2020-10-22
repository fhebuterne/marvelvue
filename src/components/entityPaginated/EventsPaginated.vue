<template>
  <EventsTable :events="events" v-if="!loading && !error"></EventsTable>
  <font-awesome-icon :icon="['fas', 'spinner']" :size="'4x'" spin v-if="loading"/>
  <div class="alert alert-danger" role="alert" v-if="error && !loading">
    Une erreur s'est produite lors de l'appel d'API.
  </div>
  <PaginationRow v-model:paginatedResults="paginatedResults"
                 :textStyle="'text-dark'"
                 @updatepaginationevent="updatedPagination($event)"></PaginationRow>
</template>

<script lang="ts">
import {Options} from 'vue-class-component';
import PaginatedResults from "@/models/base/PaginatedResults";
import PaginatedEntity from "@/models/base/PaginatedEntity";
import PaginationRow from "@/components/PaginationRow.vue";
import {library} from "@fortawesome/fontawesome-svg-core";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";
import EventsTable from "@/components/entityTable/EventsTable.vue";
import Event from "@/models/marvel/event/Event";
import {marvelEventsService} from "@/services/MarvelEventsService";
import EventDataContainer from "@/models/marvel/event/EventDataContainer";
import AbstractPaginated from "@/components/entityPaginated/AbstractPaginated.vue";

library.add(faSpinner);

@Options({
  components: {
    EventsTable,
    PaginationRow
  }
})
export default class EventsPaginated extends AbstractPaginated {

  callApiMarvel(init: boolean) {
    this.loading = true;
    this.error = false;
    marvelEventsService.getEventBy(this.filterBy, this.id, this.paginatedResults.marvelSearchParams).then(() => {
      const paginatedResults = EventDataContainer.query().with("results").limit(1).first() as PaginatedResults<PaginatedEntity>;
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

  get events() {
    return Event.all();
  }

}
</script>
