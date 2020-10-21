<template>
  <div class="row">
      <div class="card mb-3" style="width: 100%;">
        <div class="row no-gutters">
          <div class="col-md-4 align-self-center">
            <img v-bind:src="event.thumbnail" class="card-img" v-bind:alt="event.id" v-if="event && event.thumbnail">
          </div>
          <div class="col">
            <div class="card-body">
              <h5 class="card-title">{{ event?.title }}</h5>
              <p class="card-text" v-html="event?.checkNullableDescription"></p>
            </div>
            <div class="card-footer bg-transparent"><small class="text-muted">Dernière modification le
              {{ event?.formattedDate }}</small></div>
          </div>
        </div>
      </div>
    </div>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import {Prop} from "vue-property-decorator";
import Event from "@/models/marvel/event/Event";

@Options({
  components: {}
})
export default class EventRow extends Vue {

  @Prop()
  event: Event = new Event()

}
</script>
