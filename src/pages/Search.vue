<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-2"></div>
      <div class="col-8">
        <h1>Résultat(s)</h1>
        <PaginationRow :paginatedResults="paginatedCharacters"></PaginationRow>
        <br/>
        <div v-for="(character) in paginatedCharacters?.results" :key="character.id">
          <CharacterSelect :character="character" v-on:click="this.checkCharacter(character.id)"></CharacterSelect>
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
import CharacterSelect from "@/components/CharacterSelect.vue";
import CharacterDataContainer from "@/models/marvel/character/CharacterDataContainer";
import PaginationRow from "@/components/PaginationRow.vue";

library.add(faUserSecret)
library.add(faSearch)
library.add(faSpinner)

@Options({
  components: {
    CharacterSelect,
    PaginationRow
  }
})
export default class Search extends Vue {

  mounted() {
    /*if (!this.paginatedCharacters || this.paginatedCharacters.results?.length === 0) {
      this.$router.push("/")
    }*/
  }

  checkCharacter(id: string) {
    this.$router.push(`/character/${id}`);
  }

  get paginatedCharacters() {
    return CharacterDataContainer.query().with("results").limit(1).first();
  }

}
</script>
