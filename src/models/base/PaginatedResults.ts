export default interface PaginatedResults<T> {
    offset?: number;
    limit?: number;
    total?: number;
    count?: number;
    results: T[];
}
