import DbModel from './DbModel';

export default class Ingredient extends DbModel {
    private _name: string;

    constructor(name: string, id?: number) {
        super(id);
        this._name = name;
    }

    public toJSON(): string {
        return JSON.stringify(this.toObject());
    }

    public toObject(): object {
        return this.id
            ? {
                  id: this.id,
                  name: this.name,
              }
            : {
                  name: this.name,
              };
    }
    public static fromJSON(json: any): Ingredient {
        return new Ingredient(json['name'], json['id']);
    }

    public get name(): string {
        return this._name;
    }

    public set name(value: string) {
        this._name = value;
    }
}
