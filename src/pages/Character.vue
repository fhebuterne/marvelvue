<template>
  <div class="container">
    <div class="row">
      <div class="col-3"></div>
      <div class="col">
        <div class="card mb-3" style="width: 100%;">
          <div class="row no-gutters">
            <div class="col-md-4">
              <!--img v-bind:src="character.thumbnail" class="card-img" v-bind:alt="character.id"-->
            </div>
            <div class="col">
              <div class="card-body">
                <!--h5 class="card-title">{{ character.name }}</h5-->
                <!--p class="card-text" v-html="character.description"></p-->
              </div>
              <div class="card-footer bg-transparent"><small class="text-muted">Dernière modification le <!--{{formattedDate}}--></small></div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-3"></div>
    </div>

    <div class="row pt-5">
      <div class="col-sm bg-light rounded">
        <div class="row bg-secondary text-dark">
          <div class="ml-2">
            Comics :
          </div>
        </div>
        <div class="row ml-1">
          v-for comics
          <!--{{ character.name }}-->
        </div>
      </div>
      <div class="col-sm bg-light rounded ml-5">
        <div class="row bg-secondary text-dark">
          <div class="ml-2">
            Events :
          </div>
        </div>
        <div class="row ml-1">
          v-for events
        </div>
      </div>
    </div>
    <div class="row mt-5">
      <div class="col-sm bg-light rounded">
        <div class="row bg-secondary text-dark">
          <div class="ml-2">
            Series :
          </div>
        </div>
        <div class="row ml-1">
          v-for series
        </div>
      </div>
      <div class="col-sm bg-light rounded ml-5">
        <div class="row bg-secondary text-dark">
          <div class="ml-2">
            Stories :
          </div>
        </div>
        <div class="row ml-1">
          v-for stories
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import {library} from "@fortawesome/fontawesome-svg-core";
import {faSearch, faSpinner, faUserSecret} from "@fortawesome/free-solid-svg-icons";
//import CharacterApi from "@/models/marvel/Character";

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

  /*get character() {
    return CharacterApi.all().slice(0, 1)[0];
  }*/
}
</script>