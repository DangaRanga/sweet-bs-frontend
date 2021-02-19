export default abstract class DbModel {
    private _id?: number;

    constructor(id?:number) {
        this._id=id;
    }

    public get id() : number | undefined{
        return this._id;
    }

    public abstract toJSON():string;

    public abstract toObject():object;
    
    public static fromJSON(json:any): DbModel {
        throw new Error('Method not implemented.');
    };
    
}