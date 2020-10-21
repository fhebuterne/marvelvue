<template>
  <div class="row justify-content-center">
    <div class="col"></div>
    <div class="col text-center">
      <img alt="Marvel Logo" src="../assets/images/marvel-logo.png" class="w-50 mt-4 rounded">
      <div class="input-group mb-2 mt-3 ">
        <div class="input-group-prepend">
                    <span class="input-group-text before" id="basic-addon1">
                        <font-awesome-icon :icon="['fas', 'search']"/>
                    </span>
        </div>
        <input type="text" class="form-control" placeholder="Nom d'un personnage" v-model="characterName">
        <div class="input-group-append" v-if="isLoading">
                <span class="input-group-text after">
                    <font-awesome-icon :icon="['fas', 'spinner']" spin/>
                </span>
        </div>
      </div>
      <div class="input-group mb-3">
        <ul class="list-group shadow" style="width: 100%">
          <li class="list-group-item" v-for="character in characters" :key="character.id"
              v-on:click="this.checkCharacter(character.id)">
            {{ character.name }}
          </li>
        </ul>
      </div>
    </div>
    <div class="col"></div>
  </div>
  <div class="row justify-content-center">
    <div class="col"></div>
    <div class="col-auto">
      <button type="button" class="btn btn-dark" @click="this.$router.push('/search')">Rechercher</button>
      <span class="ml-2 mr-2"></span>
      <button type="button" class="btn btn-dark" @click="redirectToFirstResult()">J'ai de la chance</button>
    </div>
    <div class="col"></div>
  </div>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import {Prop, Watch} from "vue-property-decorator";
import {library} from "@fortawesome/fontawesome-svg-core";
import {faSearch, faSpinner, faUserSecret} from "@fortawesome/free-solid-svg-icons";
import {marvelCharactersService} from "@/services/MarvelCharactersService";
import Character from "@/models/marvel/character/Character";
import {MarvelSearchParams} from "@/models/marvel/MarvelSearchParams";

library.add(faUserSecret)
library.add(faSearch)
library.add(faSpinner)

@Options({
  components: {}
})
export default class Home extends Vue {

  @Prop()
  characterName = ""

  @Prop()
  isLoading = false

  get characters() {
    return Character.all().slice(0, 10)
  }

  redirectToFirstResult() {
    const characterFirst = Character.query().first();
    if (characterFirst) {
      this.$router.push(`/character/${characterFirst?.id}`);
    }
  }

  checkCharacter(id: string) {
    this.$router.push(`/character/${id}`);
  }

  @Watch('characterName')
  getSuggestions(newText: string, oldText: string) {
    const marvelSearchParams = new MarvelSearchParams();
    if (newText != "") {
      marvelSearchParams.nameStartsWith = newText;
    }

    this.isLoading = true;
    marvelCharactersService.getCharacters(marvelSearchParams).finally(() => {
      this.isLoading = false;
    });
  }
}
</script>

<style lang="scss">
.form-control {
  border-radius: 0 25px 25px 0;
}

.input-group-text {
  background-color: #ffffff;

  &.before {
    border-radius: 25px 0 0 25px;
  }

  &.after {
    border-radius: 0 25px 25px 0;
  }
}

.list-group-item {
  padding: 0.25rem 1.25rem;
}
</style>
