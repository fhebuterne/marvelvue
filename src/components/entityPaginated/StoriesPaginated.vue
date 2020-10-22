<template>
  <StoriesTable :stories="stories" v-if="!loading && !error"></StoriesTable>
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
import StoriesTable from "@/components/entityTable/StoriesTable.vue";
import {marvelStoriesService} from "@/services/MarvelStoriesService";
import StoryDataContainer from "@/models/marvel/story/StoryDataContainer";
import Story from "@/models/marvel/story/Story";
import AbstractPaginated from "@/components/entityPaginated/AbstractPaginated.vue";

library.add(faSpinner);

@Options({
  components: {
    StoriesTable,
    PaginationRow
  }
})
export default class StoriesPaginated extends AbstractPaginated {

  callApiMarvel(init: boolean) {
    this.loading = true;
    this.error = false;
    marvelStoriesService.getStoryBy(this.filterBy, this.id, this.paginatedResults.marvelSearchParams).then(() => {
      const paginatedResults = StoryDataContainer.query().with("results").limit(1).first() as PaginatedResults<PaginatedEntity>;
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

  get stories() {
    return Story.all();
  }

}
</script>

<style lang="scss">
tr {
  cursor: pointer;
}
</style>
