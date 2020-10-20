<template>
  <div class="row">
    <table class="table table-hover" v-if="events && events.length > 0">
      <thead>
      <tr>
        <th scope="col">ID</th>
        <th scope="col">Titre</th>
        <th scope="col">Description</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="event of events" :key="event.id" @click="redirect(event.id)">
        <th scope="row">{{ event.id }}</th>
        <td>{{ event.title }}</td>
        <td style="width:60%">{{ event.limitedDescription }}</td>
      </tr>
      </tbody>
    </table>
    <div class="alert alert-primary w-100 text-center" role="alert" v-if="events.length === 0">
      Aucun résultat trouvé
    </div>
  </div>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import {Prop} from "vue-property-decorator";
import Event from "@/models/marvel/event/Event"

@Options({
  components: {}
})
export default class EventsTable extends Vue {

  @Prop()
  events: Event[] = [];

  redirect(id: number) {
    this.$router.push(`/event/${id}`);
  }


}
</script>
