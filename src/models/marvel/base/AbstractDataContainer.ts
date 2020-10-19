import PaginatedResults from "@/models/base/PaginatedResults";
import {Model} from "@vuex-orm/core";
import {MarvelSearchParams} from "@/models/marvel/MarvelSearchParams";

export default abstract class AbstractDataContainer<T> extends Model implements PaginatedResults<T> {
    id?: string;
    offset?: number;
    limit?: number;
    total?: number;
    count?: number;
    currentPage = 1;
    results: T[] = [];
    marvelSearchParams?: MarvelSearchParams
}
