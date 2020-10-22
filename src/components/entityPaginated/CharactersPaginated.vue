<template>
  <CharactersTable :characters="characters" v-if="!loading && !error"></CharactersTable>
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
import CharactersTable from "@/components/entityTable/CharactersTable.vue";
import {marvelCharactersService} from "@/services/MarvelCharactersService";
import Character from "@/models/marvel/character/Character";
import CharacterDataContainer from "@/models/marvel/character/CharacterDataContainer";
import AbstractPaginated from "@/components/entityPaginated/AbstractPaginated.vue";

library.add(faSpinner);

@Options({
  components: {
    CharactersTable,
    PaginationRow
  }
})
export default class CharactersPaginated extends AbstractPaginated {

  callApiMarvel(init: boolean) {
    this.loading = true;
    this.error = false;
    marvelCharactersService.getCharacterBy(this.filterBy, this.id, this.paginatedResults.marvelSearchParams).then(() => {
      const paginatedResults = CharacterDataContainer.query().with("results").limit(1).first() as PaginatedResults<PaginatedEntity>;
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

  get characters() {
    return Character.all();
  }

}
</script>
