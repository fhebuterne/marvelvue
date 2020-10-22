<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-3"></div>
      <div class="col">
        <h2 class="text-center text-white">Evènement</h2>
        <EventRow v-if="event" :event="event"></EventRow>
      </div>
      <div class="col-3"></div>
    </div>

    <div class="row mb-4">
      <div class="col-6">
        <CardToggle>
          <template v-slot:header>
            Les personnages liés à l'évènement <b>{{ event?.name }}</b>
          </template>
          <template v-slot:body>
            <CharactersPaginated :id="eventId" :filterBy="'EVENT'"></CharactersPaginated>
          </template>
        </CardToggle>
      </div>
      <div class="col-6">
        <CardToggle>
          <template v-slot:header>
            Les comics liés à l'évènement <b>{{ event?.name }}</b>
          </template>
          <template v-slot:body>
            <ComicsPaginated :id="eventId" :filterBy="'EVENT'"></ComicsPaginated>
          </template>
        </CardToggle>
      </div>
    </div>

    <div class="row">
      <div class="col-6">
        <CardToggle>
          <template v-slot:header>
            Les séries liés à l'évènement <b>{{ event?.name }}</b>
          </template>
          <template v-slot:body>
            <SeriesPaginated :id="eventId" :filterBy="'EVENT'"></SeriesPaginated>
          </template>
        </CardToggle>
      </div>

      <div class="col-6">
        <CardToggle>
          <template v-slot:header>
            Les histoires liées à l'évènement <b>{{ event?.name }}</b>
          </template>
          <template v-slot:body>
            <StoriesPaginated :id="eventId" :filterBy="'EVENT'"></StoriesPaginated>
          </template>
        </CardToggle>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import EventModel from "@/models/marvel/event/Event";
import CardToggle from "@/components/CardToggle.vue";
import {marvelEventsService} from "@/services/MarvelEventsService";
import StoriesPaginated from "@/components/entityPaginated/StoriesPaginated.vue";
import CharactersPaginated from "@/components/entityPaginated/CharactersPaginated.vue";
import EventRow from "@/components/entityRow/EventRow.vue";
import SeriesPaginated from "@/components/entityPaginated/SeriesPaginated.vue";
import ComicsPaginated from "@/components/entityPaginated/ComicsPaginated.vue";

@Options({
  components: {
    EventRow,
    CardToggle,
    ComicsPaginated,
    SeriesPaginated,
    StoriesPaginated,
    CharactersPaginated
  }
})
export default class Event extends Vue {

  mounted() {
    const eventId = this.$route.params.id.toString();
    marvelEventsService.getEvent(eventId).catch(error => {
      if (error.response.status == 404) {
        this.$router.push("/notfound");
      }
    });
  }

  get event() {
    return EventModel.find(this.$route.params.id.toString());
  }

  get eventId() {
    return this.$route.params.id.toString();
  }

}
</script>
