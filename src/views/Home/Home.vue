<template src="./Home.html"></template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import {Prop, Watch} from "vue-property-decorator";
import {library} from "@fortawesome/fontawesome-svg-core";
import {faSearch, faUserSecret} from "@fortawesome/free-solid-svg-icons";
import {marvelCharactersService} from "@/services/MarvelCharactersService";

library.add(faUserSecret)
library.add(faSearch)

@Options({
  components: {}
})
export default class Home extends Vue {
  @Prop()
  testData: unknown = "aaaaa";

  @Prop()
  characterName = "";

  mounted() {
    marvelCharactersService.getCaracters().then(value => {
      console.log(value);
    })
  }

  @Watch('characterName')
  getSuggestions(val: string, oldVal: string) {
    console.log(val);
    console.log(oldVal);
    console.log("changed ok");
  }
}
</script>

<style lang="scss">
@import "./Home";
</style>
