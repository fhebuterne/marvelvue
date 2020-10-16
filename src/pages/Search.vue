<template>
  <h1>Résultat(s)</h1>
  <div v-for="character in characters" :key="character.id">
    <CharacterSelect :character="character"></CharacterSelect>
  </div>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import {library} from "@fortawesome/fontawesome-svg-core";
import {faSearch, faSpinner, faUserSecret} from "@fortawesome/free-solid-svg-icons";
import CharacterSelect from "@/components/Navbar/CharacterSelect.vue";
import Character from "@/models/marvel/Character";

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
    if (this.characters.length == 0) {
      this.$router.push("/")
    }
  }

  get characters() {
    return Character.all()
  }

}
</script>
