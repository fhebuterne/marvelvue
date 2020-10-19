import {Model} from "@vuex-orm/core";
import PaginatedEntity from "@/models/base/PaginatedEntity";

export default abstract class AbstractEntity<T> extends Model implements PaginatedEntity {
    id?: number;
    description?: string;
    modified?: Date;

    get limitedDescription(): string {
        if (this.description == null || this.description == "" || this.description == "null") {
            return "Aucune description disponible";
        }
        return this.description?.substring(0, 100) + "...";
    }
}
