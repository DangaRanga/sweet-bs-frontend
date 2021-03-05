/**
 * The base class for all objects from the database
 */
export default abstract class DbModel {
    // All items in the database have an id
    private _id?: number;

    constructor(id?: number) {
        this._id = id;
    }

    public get id(): number | undefined {
        return this._id;
    }

    /**
     * This DbModel as a JSON string
     */
    public abstract toJSON(): string;

    /**
     * This DbModel as a javascript object
     */
    public abstract toObject(): object;

    /**
     * Constructs an object from the database object in JSON format, generally returned from the backend.
     * @param json 
     */
    public static fromJSON(json: any): DbModel {
        throw new Error('Method not implemented.');
    }
}
