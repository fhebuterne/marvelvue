<template>
  <div class="row d-flex align-items-center">
    <div class="col-sm">
      Résultats par page : {{ paginatedResults.limit }}
    </div>
    <div class="col-sm">
      <div class="btn-toolbar justify-content-center" role="toolbar" aria-label="Toolbar with button groups">
        <div class="btn-group mr-2" role="group" aria-label="First group">
          <button type="button" class="btn btn-secondary">« Précédent</button>
          <button type="button" class="btn btn-secondary active">1</button>
          <button type="button" class="btn btn-secondary">2</button>
          <button type="button" class="btn btn-secondary">3</button>
          <button type="button" class="btn btn-secondary">Suivant »</button>
        </div>
      </div>
    </div>
    <div class="col-sm">
      <span class="float-right">Total : {{ paginatedResults.total }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import {Prop} from "vue-property-decorator";
import PaginatedResults from "@/models/base/PaginatedResults";

@Options({
  components: {}
})
export default class PaginationRow extends Vue {

  @Prop()
  paginatedResults?: PaginatedResults<any>;

  get currentPage(): number {
    if (!this.paginatedResults) {
      return 1;
    }

    if (this.paginatedResults.offset == 0) {
      return 1;
    }

    if (this.paginatedResults.limit && this.paginatedResults.offset) {
      return this.paginatedResults.limit / this.paginatedResults.offset;
    }

    return 1;
  }

}
</script>
