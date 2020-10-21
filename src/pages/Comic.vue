<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-3"></div>
      <div class="col">
        <h2 class="text-center text-white">Comic</h2>
        <ComicRow v-if="comic" :comic="comic"></ComicRow>
      </div>
      <div class="col-3"></div>
    </div>

    <div class="row mb-4">
      <div class="col-6">
        <CardToggle>
          <template v-slot:header>
            Les personnages liés au comic <b>{{ comic?.name }}</b>
          </template>
          <template v-slot:body>
            <CharactersPaginated :id="comicId" :filterBy="'COMIC'"></CharactersPaginated>
          </template>
        </CardToggle>
      </div>
      <div class="col-6">
        <CardToggle>
          <template v-slot:header>
            Les évènements liés au comic <b>{{ comic?.name }}</b>
          </template>
          <template v-slot:body>
            <EventsPaginated :id="comicId" :filterBy="'COMIC'"></EventsPaginated>
          </template>
        </CardToggle>
      </div>
    </div>

    <div class="row">
      <div class="col-6">

      </div>

      <div class="col-6">
        <CardToggle>
          <template v-slot:header>
            Les histoires liées au comic <b>{{ comic?.name }}</b>
          </template>
          <template v-slot:body>
            <StoriesPaginated :id="comicId" :filterBy="'COMIC'"></StoriesPaginated>
          </template>
        </CardToggle>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import {marvelComicsService} from "@/services/MarvelComicsService";
import CardToggle from "@/components/CardToggle.vue";
import {library} from "@fortawesome/fontawesome-svg-core";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";
import ComicRow from "@/components/entityRow/ComicRow.vue";
import ComicModel from "@/models/marvel/comic/Comic";
import StoriesPaginated from "@/components/entityPaginated/StoriesPaginated.vue";
import CharactersPaginated from "@/components/entityPaginated/CharactersPaginated.vue";
import EventsPaginated from "@/components/entityPaginated/EventsPaginated.vue";

library.add(faSpinner)

@Options({
  components: {
    ComicRow,
    CardToggle,
    EventsPaginated,
    StoriesPaginated,
    CharactersPaginated
  }
})
export default class Comic extends Vue {

  mounted() {
    const comicId = this.$route.params.id.toString();
    marvelComicsService.getComic(comicId).catch(error => {
      if (error.response.status == 404) {
        this.$router.push("/notfound");
      }
    });
  }

  get comic() {
    return ComicModel.find(this.$route.params.id.toString());
  }

  get comicId() {
    return this.$route.params.id.toString();
  }

}
</script>

<style lang="scss">
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
{
  opacity: 0;
}
</style>
