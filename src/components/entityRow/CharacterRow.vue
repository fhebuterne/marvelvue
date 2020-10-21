<template>
  <div class="row">
      <div class="card mb-3" style="width: 100%;">
        <div class="row no-gutters">
          <div class="col-md-4 align-self-center">
            <img v-bind:src="character.thumbnail" class="card-img" v-bind:alt="character.id" v-if="character">
          </div>
          <div class="col">
            <div class="card-body">
              <h5 class="card-title">{{ character?.name }}</h5>
              <p class="card-text" v-html="character?.checkNullableDescription"></p>
            </div>
            <div class="card-footer bg-transparent"><small class="text-muted">Dernière modification le
              {{ character?.formattedDate }}</small></div>
          </div>
        </div>
      </div>
    </div>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import {Prop} from "vue-property-decorator";
import Character from "@/models/marvel/character/Character";

@Options({
  components: {}
})
export default class CharacterRow extends Vue {

  @Prop()
  character: Character = new Character()

}
</script>
