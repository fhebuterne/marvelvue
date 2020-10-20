<template>
  <div class="row">
    <table class="table table-hover">
      <thead>
      <tr>
        <th scope="col">ID</th>
        <th scope="col">Titre</th>
        <th scope="col">Description</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="character of characters" :key="character.id" @click="redirect(character.id)">
        <th scope="row">{{ character.id }}</th>
        <td>{{ character.name }}</td>
        <td style="width:50%">{{ character.limitedDescription }}</td>
      </tr>
      </tbody>
    </table>
    </div>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import {Prop} from "vue-property-decorator";
import Character from "@/models/marvel/character/Character";

@Options({
  components: {}
})
export default class CharactersTable extends Vue {

  @Prop()
  characters: Character[] = [];

  redirect(id: number) {
    this.$router.push(`/character/${id}`);
  }

}
</script>

<style lang="scss">
  tr {
    cursor: pointer;
  }
</style>
