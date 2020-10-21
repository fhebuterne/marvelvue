import {Model} from "@vuex-orm/core";
import PaginatedEntity from "@/models/base/PaginatedEntity";

export default abstract class AbstractEntity<T> extends Model implements PaginatedEntity {
    id?: number;
    description?: string;
    modified?: Date;

    get checkNullableDescription(): string {
        if (this.description == null || this.description.trim() == "" || this.description.trim() == "null") {
            return "Aucune description disponible";
        }
        return this.description;
    }

    get limitedDescription(): string {
        return this.checkNullableDescription.substring(0, 100) + "...";
    }

    get formattedDate() {
        if (!this.modified) {
            return "..."
        }
        return new Date(this.modified).toLocaleString()
    }
}
