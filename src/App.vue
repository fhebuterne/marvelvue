<template>
  <div class="container-fluid">
    <router-view/>
  </div>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import Navbar from "@/components/Navbar/Navbar.vue";

@Options({
  components: {
    Navbar
  }
})
export default class App extends Vue {
}
</script>

<style lang="scss">
@import "../node_modules/bootstrap/scss/bootstrap.scss";
@import "./assets/styles/common";
</style>
