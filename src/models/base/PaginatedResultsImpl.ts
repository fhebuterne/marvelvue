import PaginatedEntity from "@/models/base/PaginatedEntity";
import {MarvelSearchParams} from "@/models/marvel/MarvelSearchParams";
import PaginatedResults from "@/models/base/PaginatedResults";

export default class PaginatedResultsImpl<T extends PaginatedEntity> implements PaginatedResults<T> {
    offset = 20;
    limit = 20;
    total = 0;
    count = 0;
    currentPage = 1;
    results: T[] = [];
    marvelSearchParams: MarvelSearchParams = new MarvelSearchParams();
}
