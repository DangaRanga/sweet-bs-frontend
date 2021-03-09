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
export function fromJSON<T extends DbModel>(json: string): T | null {
    // parse the json
    var modelObj = JSON.parse(json);
    // check if it is a DbModel of type T then return the object if it is or null if it is not.
    return isDbModel<T>(modelObj) ? (modelObj as T) : null;
}

/**
 * Checks if an object is of type T, a DbModel.
 * @template {T extends DbModel} T the type of DbModel to be checked
 * @param {any} obj any object to be tested
 * @returns whether the object passed in is of type T
 */
function isDbModel<T extends DbModel>(obj: any): obj is T {
    try {
        // try to type cast to T
        var test = obj as T;
        // if type casting works then it fits the type
        return true;
    } catch (e) {
        // otherwise, it is not of type T
        return false;
    }
}

/**
 * **This method is a stub**
 * @returns App data from localStorage
 */
export function fetchAppData(): AppData {
    return (
        JSON.parse(localStorage.getItem('sweetbs-data') ?? '') || {
            jwt: '',
            cartItems: [],
        }
    );
}

/**
 * **This method is stub**
 * @param data app data to be stored
 */
export function storeAppData(data: AppData) {
    localStorage.setItem('sweetbs-data', JSON.stringify(data));
}
