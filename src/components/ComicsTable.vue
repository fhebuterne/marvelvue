<template>
  <div class="row">
    <table class="table table-hover">
      <thead>
      <tr>
        <th scope="col">ID</th>
        <th scope="col">Titre</th>
        <th scope="col">Nombre de page</th>
        <th scope="col">Description</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="comic of comics" :key="comic.id">
        <th scope="row">{{ comic.id }}</th>
        <td>{{ comic.title }}</td>
        <td>{{ comic.pageCount }}</td>
        <td style="width:50%">{{ comic.limitedDescription }}</td>
      </tr>
      </tbody>
    </table>
    </div>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import {Prop} from "vue-property-decorator";
import Comic from "@/models/marvel/comic/Comic"

@Options({
  components: {}
})
export default class ComicsTable extends Vue {

  @Prop()
  comics: Comic[] = []

}
</script>
