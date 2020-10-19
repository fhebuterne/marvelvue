export class SearchParameters {
    params: Map<string, string> = new Map<string, string>();

    toString(): string {
        let concatenation = "";
        this.params.forEach((value, key) => {
            concatenation += key + "=" + value + "&"
        })
        return concatenation;
    }

    static objToParams(obj: object) {
        let concatenation = "";
        for (const [key, value] of Object.entries(obj)) {
            if (value != null && value != "") {
                concatenation += key + "=" + value + "&"
            }
        }
        return concatenation;
    }
}
