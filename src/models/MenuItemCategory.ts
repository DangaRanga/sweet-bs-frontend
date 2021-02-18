import { Model, MenuItem } from '.';

export default class MenuItemCategory extends Model {
    private _name: string;
    private _menuitems?: MenuItem[];

    constructor(category: string, menuitems?: MenuItem[], id?: number) {
        super(id);
        this._name = category;
        this._menuitems = menuitems;
    }

    public toJSON(): object {
        return this.id
            ? {
                  menuitems: this.menuitems?.map((v) => v.toJSON()) ?? [],
                  name: this.name,
                  id: this.id,
              }
            : {
                  menuitems: this.menuitems?.map((v) => v.toJSON()) ?? [],
                  name: this.name,
              };
    }

    public static fromJSON(json: any): MenuItemCategory {
        return new MenuItemCategory(
            json['name'],
            json['menuitems']?.map((v: any) => MenuItem.fromJSON(v)) ?? [],
            json['id']
        );
    }

    public get name(): string {
        return this._name;
    }

    public set name(value: string) {
        this._name = value;
    }

    public get menuitems(): MenuItem[] | undefined {
        return this._menuitems;
    }
}