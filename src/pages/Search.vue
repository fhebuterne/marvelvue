<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-2"></div>
      <div class="col-8">
        <h1 class="text-white">Résultat(s)</h1>
        <PaginationRow v-model:paginatedResults="paginatedResults"
                       @updatepaginationevent="updatedPagination($event)"></PaginationRow>
        <br/>
        <div v-for="character of results" :key="character">
          <CharacterRow :character="character" v-on:click="this.checkCharacter(character.id)"></CharacterRow>
        </div>
      </div>
      <div class="col-2"></div>
    </div>
  </div>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import {library} from "@fortawesome/fontawesome-svg-core";
import {faSearch, faSpinner, faUserSecret} from "@fortawesome/free-solid-svg-icons";
import CharacterDataContainer from "@/models/marvel/character/CharacterDataContainer";
import PaginationRow from "@/components/PaginationRow.vue";
import PaginatedResults from "@/models/base/PaginatedResults";
import PaginatedEntity from "@/models/base/PaginatedEntity";
import {marvelCharactersService} from "@/services/MarvelCharactersService";
import CharacterRow from "@/components/entityRow/CharacterRow.vue";

library.add(faUserSecret)
library.add(faSearch)
library.add(faSpinner)

@Options({
  components: {
    CharacterRow,
    PaginationRow
  }
})
export default class Search extends Vue {

  paginatedResults?: PaginatedResults<PaginatedEntity>;
  results: PaginatedEntity[] = [];

  created() {
    this.paginatedResults = CharacterDataContainer.query().with("results").limit(1).first() as PaginatedResults<PaginatedEntity>;

    if (!this.paginatedResults) {
      this.$router.push("/");
      return;
    }

    if (this.paginatedResults.results) {
      this.results = this.paginatedResults.results;
    }
  }

  checkCharacter(id: string) {
    this.$router.push(`/character/${id}`);
  }

  updatedPagination(paginatedResults: PaginatedResults<PaginatedEntity>) {
    this.paginatedResults = paginatedResults as PaginatedResults<PaginatedEntity>;

    if (this.paginatedResults.marvelSearchParams) {
      if (this.paginatedResults.offset) {
        this.paginatedResults.marvelSearchParams.offset = this.paginatedResults.offset;
      } else {
        this.paginatedResults.marvelSearchParams.offset = 0;
      }
      marvelCharactersService.getCharacters(this.paginatedResults.marvelSearchParams).then(() => {
        const paginatedResults = CharacterDataContainer.query().with("results").limit(1).first() as PaginatedResults<PaginatedEntity>;
        if (this.paginatedResults) {
          this.paginatedResults.results = paginatedResults.results;
          this.paginatedResults.offset = paginatedResults.offset;
          this.results = paginatedResults.results;
        }
      });
    }
  }

}
</script>
