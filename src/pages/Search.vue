<template>
  <div>
    <h1>Résultat(s)</h1>
    <div class="row d-flex align-items-center">
      <div class="col-sm">
        Résultats par page : {{ paginatedCaracters?.limit }}
      </div>
      <div class="col-sm">
        <div class="btn-toolbar justify-content-center" role="toolbar" aria-label="Toolbar with button groups">
          <div class="btn-group mr-2" role="group" aria-label="First group">
            <button type="button" class="btn btn-secondary">«</button>
            <button type="button" class="btn btn-secondary active">1</button>
            <button type="button" class="btn btn-secondary">2</button>
            <button type="button" class="btn btn-secondary">3</button>
            <button type="button" class="btn btn-secondary">»</button>
          </div>
        </div>
      </div>
      <div class="col-sm">
        <span class="float-right">Total :   {{ paginatedCaracters?.total }}</span>
      </div>
    </div>
    <div v-for="(character) in paginatedCaracters?.results" :key="character.id">
      <CharacterSelect :character="character" v-on:click="this.checkCharacter(character.id)"></CharacterSelect>
    </div>
  </div>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import {library} from "@fortawesome/fontawesome-svg-core";
import {faSearch, faSpinner, faUserSecret} from "@fortawesome/free-solid-svg-icons";
import CharacterSelect from "@/components/Navbar/CharacterSelect.vue";
import CharacterDataContainer from "@/models/marvel/CharacterDataContainer";

library.add(faUserSecret)
library.add(faSearch)
library.add(faSpinner)

@Options({
  components: {
    CharacterSelect
  }
})
export default class Search extends Vue {

  mounted() {
    if (!this.paginatedCaracters || this.paginatedCaracters.results?.length === 0) {
      this.$router.push("/")
    }
  }

  checkCharacter(id: string) {
    this.$router.push(`/character/${id}`);
  }

  get paginatedCaracters() {
    return CharacterDataContainer.query().with("results").limit(1).first();
  }

}
</script>
