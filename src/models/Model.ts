export default abstract class Model {
    private _id?: number;

    constructor(id?:number) {
        this._id=id;
    }

    
    public get id() : number | undefined{
        return this._id;
    }

    public abstract toJSON():object;

    public static fromJSON(json:any): Model {
        throw new Error('Method not implemented.');
    };
    
}