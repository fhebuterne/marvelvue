<template>
  <div class="row">
    <div class="col-3"></div>
    <div class="col">
      <div class="card mb-3" style="width: 100%;">
        <div class="row no-gutters">
          <div class="col-md-4">
            <img v-bind:src="character.thumbnail" class="card-img" v-bind:alt="character.id">
          </div>
          <div class="col">
            <div class="card-body">
              <h5 class="card-title">{{ character.name }}</h5>
              <p class="card-text" v-html="character.description"></p>
            </div>
            <div class="card-footer bg-transparent"><small class="text-muted">Dernière modification le {{formattedDate}}</small></div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-3"></div>
  </div>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import {Prop} from "vue-property-decorator";
import {library} from "@fortawesome/fontawesome-svg-core";
import {faSearch, faUserSecret} from "@fortawesome/free-solid-svg-icons";
import Character from "@/models/marvel/Character";

library.add(faUserSecret)
library.add(faSearch)

@Options({
  components: {}
})
export default class CharacterSelect extends Vue {

  @Prop()
  character: Character = new Character()

  get formattedDate(){
    if (!this.character.modified) {
      return "..."
    }
    return new Date(this.character.modified).toLocaleString()
  }

}
</script>
