<template>
  <div class="row">
      <div class="card mb-3" style="width: 100%;">
        <div class="row no-gutters">
          <div class="col-md-4">
            <img v-bind:src="comic.thumbnail" class="card-img" v-bind:alt="comic.id" v-if="comic && comic.thumbnail">
          </div>
          <div class="col">
            <div class="card-body">
              <h5 class="card-title">{{ comic?.title }}</h5>
              <p class="card-text" v-html="comic?.checkNullableDescription"></p>
            </div>
            <div class="card-footer bg-transparent"><small class="text-muted">Dernière modification le
              {{ comic?.formattedDate }}</small></div>
          </div>
        </div>
      </div>
    </div>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import {Prop} from "vue-property-decorator";
import Comic from "@/models/marvel/comic/Comic";

@Options({
  components: {}
})
export default class ComicRow extends Vue {

  @Prop()
  comic: Comic = new Comic()

}
</script>
