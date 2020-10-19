<template>
  <div class="row justify-content-center align-items-center">
    <div class="col"></div>
    <div class="col-auto">
      <div class="jumbotron jumbotron-fluid text-center">
        <div class="container">
          <h1 class="display-4 mb-5">404 - Page introuvable</h1>
          <button class="btn btn-secondary" @click="redirectToHome()">Accueil</button>
        </div>
      </div>
    </div>
    <div class="col"></div>
  </div>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import {library} from "@fortawesome/fontawesome-svg-core";
import {faSearch, faSpinner, faUserSecret} from "@fortawesome/free-solid-svg-icons";

library.add(faUserSecret)
library.add(faSearch)
library.add(faSpinner)

@Options({
  components: {}
})
export default class NotFound extends Vue {

  redirectToHome() {
    this.$router.push(`/`);
  }

}
</script>

<style lang="scss">
  .jumbotron {
    background-color: transparent;
    color: white;
  }
</style>
