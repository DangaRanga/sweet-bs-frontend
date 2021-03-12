/**
 * Converts a variable to a JSON string if possible
 * @param obj an object from/to be stored in the database
 * @returns a JSON string version of the object passed in or null, if the conversion failed
 */
export function toJSON(obj: any): string | null {
    var json: string;
    try {
        json = JSON.stringify(obj);
        if (json) {
            return json;
        } else {
            return null;
        }
    } catch (e) {
        return null;
    }
}

/**
 * Converts, where possible, a JSON object, array or string to type T.
 * @template {T extends any} T the type of object to parse
 * @param json a JSON representation of an object or array
 * @returns { T | null } the object if parsing was successful and null otherwise
 */
export function fromJSON<T extends any>(json: any): T | null {
    var modelObj: T;
    if (json) {
        try {
            if (typeof json === 'string') {
                // parse the json
                modelObj = JSON.parse(json) as T;
            } else {
                modelObj = json as T;
            }
            return modelObj;
        } catch (e) {
            return null;
        }
    } else {
        return null;
    }
}
