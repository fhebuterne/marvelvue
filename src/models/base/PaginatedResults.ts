import PaginatedEntity from "@/models/base/PaginatedEntity";
import {MarvelSearchParams} from "@/models/marvel/MarvelSearchParams";

export default interface PaginatedResults<T extends PaginatedEntity> {
    offset?: number;
    limit?: number;
    total?: number;
    count?: number;
    currentPage: number;
    results: T[];
    marvelSearchParams?: MarvelSearchParams;
}
