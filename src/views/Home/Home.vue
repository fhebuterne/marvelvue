<template src="./Home.html"></template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import {Prop, Watch} from "vue-property-decorator";
import {library} from "@fortawesome/fontawesome-svg-core";
import {faSearch, faSpinner, faUserSecret} from "@fortawesome/free-solid-svg-icons";
import {marvelCharactersService} from "@/services/MarvelCharactersService";
import Character from "@/models/marvel/Character";
import {SearchParameters} from "@/models/base/SearchParameters";

library.add(faUserSecret)
library.add(faSearch)
library.add(faSpinner)

@Options({
  components: {}
})
export default class Home extends Vue {

  @Prop()
  characterName = ""

  @Prop()
  isLoading = false

  get characters() {
    return Character.all().slice(0, 10)
  }

  @Watch('characterName')
  getSuggestions(newText: string, oldText: string) {
    const searchParameters = new SearchParameters();
    searchParameters.params.set("nameStartsWith", newText)

    this.isLoading = true;
    marvelCharactersService.getCharacters(searchParameters).finally(() => {
      this.isLoading = false;
    });
  }
}
</script>

<style lang="scss">
@import "./Home";
</style>
