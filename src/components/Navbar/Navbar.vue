<template src="./Navbar.html"></template>

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
