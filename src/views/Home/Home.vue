<template src="./Home.html"></template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import {Prop, Watch} from "vue-property-decorator";
import {library} from "@fortawesome/fontawesome-svg-core";
import {faSearch, faUserSecret} from "@fortawesome/free-solid-svg-icons";
import {marvelCharactersService} from "@/services/MarvelCharactersService";
import Character from "@/models/marvel/Character";

library.add(faUserSecret)
library.add(faSearch)

@Options({
  components: {}
})
export default class Home extends Vue {

  @Prop()
  characterName = ""

  get characters() {
    return Character.all()
  }

  async mounted() {
    marvelCharactersService.getCharacters();
  }

  @Watch('characterName')
  getSuggestions(newText: string, oldText: string) {
    marvelCharactersService.getCharacters(newText);
  }
}
</script>

<style lang="scss">
@import "./Home";
</style>
