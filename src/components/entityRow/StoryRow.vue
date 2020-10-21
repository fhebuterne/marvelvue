<template>
  <div class="row">
      <div class="card mb-3" style="width: 100%;">
        <div class="row no-gutters">
          <div class="col-md-4">
            <img v-bind:src="story.thumbnail" class="card-img" v-bind:alt="story.id" v-if="story && story.thumbnail">
          </div>
          <div class="col">
            <div class="card-body">
              <h5 class="card-title">{{ story?.title }}</h5>
              <p class="card-text" v-html="story?.checkNullableDescription"></p>
            </div>
            <div class="card-footer bg-transparent"><small class="text-muted">Dernière modification le
              {{ story?.formattedDate }}</small></div>
          </div>
        </div>
      </div>
    </div>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import {Prop} from "vue-property-decorator";
import Story from "@/models/marvel/story/Story";

@Options({
  components: {}
})
export default class StoryRow extends Vue {

  @Prop()
  story: Story = new Story()

}
</script>
