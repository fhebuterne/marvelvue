import PaginatedEntity from "@/models/base/Paginated";

export default interface PaginatedResults<T extends PaginatedEntity> {
    offset?: number;
    limit?: number;
    total?: number;
    count?: number;
    results: T[];
}
