<template src="./Home.html"></template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import {getModule} from "vuex-module-decorators";
import CounterModule from "@/store/CounterModule";
import {useStore} from "vuex";
import {Prop} from "vue-property-decorator";
import {library} from "@fortawesome/fontawesome-svg-core";
import {faSearch, faUserSecret} from "@fortawesome/free-solid-svg-icons";

library.add(faUserSecret)
library.add(faSearch)

@Options({
  components: {}
})
export default class Home extends Vue {
  @Prop()
  counterProgress = 0;

  mounted() {

    const store = useStore()
    const counter = getModule(CounterModule, store)
    counter.incr()
    counter.incr()
    counter.incr()

    store.watch(() => counter.getCount, (value) => {
      this.counterProgress = value
    })

    counter.incr()
  }
}
</script>

<style lang="scss">
@import "./Home";
</style>
