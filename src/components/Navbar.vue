<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#">Marvel Search</a>
    <button class="navbar-toggler" type="button" @click="toggleNavbar()">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" v-bind:class="{show: isOpen}" id="navbarNavAltMarkup">
      <div class="navbar-nav">
        <a class="nav-link active" href="#">Home <span class="sr-only">(current)</span></a>
        <a class="nav-link" href="#">Features</a>
        <a class="nav-link" href="#">Pricing</a>
        <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';

@Options({
  components: {

  }
})
export default class Navbar extends Vue {
  isOpen = false;

  toggleNavbar() {
    this.isOpen = !this.isOpen;
  }
}
</script>
