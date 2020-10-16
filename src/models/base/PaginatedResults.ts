import PaginatedEntity from "@/models/base/PaginatedEntity";

export default interface PaginatedResults<T extends PaginatedEntity> {
    offset?: number;
    limit?: number;
    total?: number;
    count?: number;
    results: T[];
}
