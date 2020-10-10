<template src="./Home.html"></template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

@Options({
  components: {
    HelloWorld,
  }
})
export default class Home extends Vue {
  private test = "coucou";

  mounted() {
    console.log("wesh : mounted")
  }
}
</script>
