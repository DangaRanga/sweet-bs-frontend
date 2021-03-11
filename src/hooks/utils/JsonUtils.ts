import { AppData } from '../models';
import DbModel from '../models/DbModel';

/**
 * Converts a database model object to a string for sending to the server
 * @param obj an object from/to be stored in the database
 * @returns a JSON string version of the object passed in
 */
export function toJSON(obj: DbModel): string {
    return JSON.stringify(obj);
}

/**
 * Converts, where possible, a JSON string to an object of type T which is a database object.
 * @template {T extends DbModel} T the type of DbModel to parse
 * @param {string} json a JSON string representation of a database object
 * @returns { T | null } the object if parsing was successful and null otherwise
 */
export function fromJSON<T extends DbModel>(json: string | object): T {
    // parse the json
    var modelObj: T;
    if (typeof json === 'object') {
        modelObj = json as T;
    } else {
        modelObj = JSON.parse(json) as T;
    }
    return modelObj;
}


/**
 * **This method is a stub**
 * @returns App data from localStorage
 */
export function fromLocalStorageFormat(json: string): AppData {
    return JSON.parse(json) as AppData;
}

/**
 * **This method is stub**
 * @param data app data to be stored
 */
export function toLocalStorageFormat(
    data: Pick<AppData, 'jwt'> | Pick<AppData, 'cartItems'> | AppData
): string {
    return JSON.stringify(data);
}
