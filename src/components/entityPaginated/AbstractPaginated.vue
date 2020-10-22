<script lang="ts">
import {Vue} from 'vue-class-component';
import {Prop} from "vue-property-decorator";
import PaginatedResults from "@/models/base/PaginatedResults";
import PaginatedEntity from "@/models/base/PaginatedEntity";
import PaginatedResultsImpl from "@/models/base/PaginatedResultsImpl";
import {MarvelSearchParams} from "@/models/marvel/MarvelSearchParams";
import {EntityEnum} from "@/models/marvel/base/EntityEnum";
import {library} from "@fortawesome/fontawesome-svg-core";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";
import set = Reflect.set;

library.add(faSpinner);

export default abstract class AbstractPaginated extends Vue {

  paginatedResults: PaginatedResults<PaginatedEntity> = new PaginatedResultsImpl();

  @Prop()
  filterBy = EntityEnum.CHARACTER;

  @Prop()
  id = '';

  loading = false;
  error = false;

  mounted() {
    this.callApiMarvel(true);
  }

  updatedPagination(paginatedResults: PaginatedResults<PaginatedEntity>) {
    this.paginatedResults = paginatedResults;

    if (!this.paginatedResults.marvelSearchParams) {
      this.paginatedResults.marvelSearchParams = new MarvelSearchParams();
    }

    set(this.paginatedResults, "offset", this.paginatedResults.offset);
    set(this.paginatedResults.marvelSearchParams, "offset", this.paginatedResults.offset);

    this.callApiMarvel(false);
  }

  abstract callApiMarvel(init: boolean): void;

}
</script>

<style lang="scss">
tr {
  cursor: pointer;
}
</style>
