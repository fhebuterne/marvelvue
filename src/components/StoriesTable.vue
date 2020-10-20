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
      <tr v-for="story of stories" :key="story.id">
        <th scope="row">{{ story.id }}</th>
        <td>{{ story.title }}</td>
        <td style="width:60%">{{ story.limitedDescription }}</td>
      </tr>
      </tbody>
    </table>
    </div>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import {Prop} from "vue-property-decorator";
import Story from "@/models/marvel/story/Story";

@Options({
  components: {}
})
export default class StoriesTable extends Vue {

  @Prop()
  stories: Story[] = []

}
</script>
