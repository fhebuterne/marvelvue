export class SearchParameters {
    params: Map<string, string> = new Map<string, string>();

    toString(): string {
        let concatenation = "";
        this.params.forEach((value, key) => {
            concatenation += key + "=" + value + "&"
        })
        return concatenation
    }
}
