import PaginatedResults from "@/models/base/PaginatedResults";
import {Model} from "@vuex-orm/core";

export default abstract class AbstractDataContainer<T> extends Model implements PaginatedResults<T> {
    id?: string;
    offset?: number;
    limit?: number;
    total?: number;
    count?: number;
    results: T[] = [];
}
