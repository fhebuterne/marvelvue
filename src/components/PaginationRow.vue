<template>
  <div class="row d-flex align-items-center text-white">
    <div class="col-sm">
      Résultats par page : {{ paginatedResults?.limit }}
    </div>

    <div class="col-sm">
      <div class="btn-toolbar justify-content-center" role="toolbar" aria-label="Toolbar with button groups">
        <div class="btn-group mr-2" role="group" aria-label="First group">
          <button type="button" class="btn btn-secondary" @click="previousPage()" @disabled="isFirstPage">« Précédent
          </button>
          <button type="button" class="btn btn-secondary" @click="previousPage()" v-if="currentPage > 1">1</button>
          <button type="button" class="btn btn-secondary active">{{ currentPage }}</button>
          <button type="button" class="btn btn-secondary" @click="nextPage()" v-if="isNextPageAvailable()">
            {{ currentPage + 1 }}
          </button>
          <button type="button" class="btn btn-secondary" @click="nextPage()">Suivant »</button>
        </div>
      </div>
    </div>
    <div class="col-sm">
      <span class="float-right">Total : {{ paginatedResults?.total }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import {Prop, Watch} from "vue-property-decorator";
import PaginatedResults from "@/models/base/PaginatedResults";
import PaginatedEntity from "@/models/base/PaginatedEntity";
import set = Reflect.set;

@Options({
  components: {}
})
export default class PaginationRow extends Vue {

  @Prop()
  paginatedResults: PaginatedResults<PaginatedEntity> = {
    count: 0,
    currentPage: 1,
    limit: 20,
    offset: 0,
    results: [],
    total: 0
  };

  currentPage = 1;

  get isFirstPage(): boolean {
    return this.currentPage === 1
  }

  isNextPageAvailable(): boolean {
    if (!this.paginatedResults || !this.paginatedResults.limit || !this.paginatedResults.total) {
      return false;
    }

    return ((this.paginatedResults.currentPage + 1) * this.paginatedResults.limit) - this.paginatedResults.limit < this.paginatedResults.total;
  }

  previousPage(): void {
    if (!this.paginatedResults || this.paginatedResults.currentPage == 1 || !this.paginatedResults.limit) {
      return;
    }

    this.paginatedResults.currentPage = this.paginatedResults.currentPage - 1;
    this.paginatedResults.offset = (this.paginatedResults.currentPage * this.paginatedResults.limit) - this.paginatedResults.limit;
    this.currentPage = this.paginatedResults.currentPage;
    this.updatePagination();
  }

  nextPage(): void {
    if (!this.paginatedResults || !this.paginatedResults.limit || !this.paginatedResults.total) {
      return;
    }

    if ((this.paginatedResults.currentPage * this.paginatedResults.limit) >= this.paginatedResults.total) {
      return;
    }

    this.paginatedResults.offset = this.paginatedResults.currentPage * this.paginatedResults.limit;
    this.paginatedResults.currentPage = this.paginatedResults.currentPage + 1;
    this.currentPage = this.paginatedResults.currentPage;
    this.updatePagination();
  }

  @Watch("paginatedResults", {immediate: true, deep: true})
  checkPagination(paginatedResults: PaginatedResults<PaginatedEntity>) {
    if (this.paginatedResults && this.paginatedResults.offset) {
      set(this.paginatedResults, this.paginatedResults.currentPage, paginatedResults.currentPage);
      set(this.paginatedResults, this.paginatedResults.offset, paginatedResults.offset);
    }
  }

  updatePagination(): void {
    this.$emit("updatepaginationevent", this.paginatedResults);
  }
}
</script>
