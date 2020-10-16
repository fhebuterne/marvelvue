<template>
  ...
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import {library} from "@fortawesome/fontawesome-svg-core";
import {faSearch, faSpinner, faUserSecret} from "@fortawesome/free-solid-svg-icons";

library.add(faUserSecret)
library.add(faSearch)
library.add(faSpinner)

@Options({
  components: {

  }
})
export default class Character extends Vue {

  mounted() {
    console.log(this.$route.params.id);
  }

}
</script>
