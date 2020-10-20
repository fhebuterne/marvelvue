<template>
  <div class="card">
    <div class="card-header" @click="toggleCard()">
      <slot name="header"></slot>

      <font-awesome-icon class="float-right" :size="'1x'"
                         :icon="['fas', 'angle-down']"
                         v-if="openedCard"/>

      <font-awesome-icon class="float-right" :size="'1x'"
                         :icon="['fas', 'angle-up']"
                         v-if="!openedCard"/>
    </div>
    <transition name="fade">
      <div class="card-body" v-if="openedCard">
        <slot name="body"></slot>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import {library} from "@fortawesome/fontawesome-svg-core";
import {faAngleDown, faAngleUp} from "@fortawesome/free-solid-svg-icons";

library.add(faAngleUp)
library.add(faAngleDown)

@Options({
  components: {}
})
export default class CardToggle extends Vue {

  openedCard = true;

  toggleCard() {
    this.openedCard = !this.openedCard;
  }

}
</script>

<style lang="scss">
  .card-header {
    cursor: pointer;
  }
</style>
