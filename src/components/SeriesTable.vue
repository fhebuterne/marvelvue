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
      <tr v-for="serie of series" :key="serie.id" @click="redirect(serie.id)">
        <th scope="row">{{ serie.id }}</th>
        <td>{{ serie.title }}</td>
        <td style="width:60%">{{ serie.limitedDescription }}</td>
      </tr>
      </tbody>
    </table>
    </div>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import {Prop} from "vue-property-decorator";
import Serie from "@/models/marvel/serie/Serie";

@Options({
  components: {}
})
export default class SeriesTable extends Vue {

  @Prop()
  series: Serie[] = [];

  redirect(id: number) {
    this.$router.push(`/serie/${id}`);
  }

}
</script>
