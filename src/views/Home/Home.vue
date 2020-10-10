<template src="./Home.html"></template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import HelloWorld from '@/components/HelloWorld.vue';
import {getModule} from "vuex-module-decorators";
import CounterModule from "@/store/CounterModule";
import {useStore} from "vuex";
import {Prop} from "vue-property-decorator";

@Options({
  components: {
    HelloWorld
  }
})
export default class Home extends Vue {
  private test = "coucou";

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
