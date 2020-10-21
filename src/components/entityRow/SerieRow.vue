<template>
  <div class="row">
      <div class="card mb-3" style="width: 100%;">
        <div class="row no-gutters">
          <div class="col-md-4">
            <img v-bind:src="serie.thumbnail" class="card-img" v-bind:alt="serie.id" v-if="serie && serie.thumbnail">
          </div>
          <div class="col">
            <div class="card-body">
              <h5 class="card-title">{{ serie?.title }}</h5>
              <p class="card-text" v-html="serie?.checkNullableDescription"></p>
            </div>
            <div class="card-footer bg-transparent"><small class="text-muted">Dernière modification le
              {{ serie?.formattedDate }}</small></div>
          </div>
        </div>
      </div>
    </div>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import {Prop} from "vue-property-decorator";
import Serie from "@/models/marvel/serie/Serie";

@Options({
  components: {}
})
export default class SerieRow extends Vue {

  @Prop()
  serie: Serie = new Serie()

}
</script>
