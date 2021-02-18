import { MenuItem,} from '.';
import DbModel from './DbModel';

export default class OrderItem extends DbModel {
    private _menuitem: MenuItem;
    private _qty: number;

    constructor(menuItem: MenuItem, qty: number, id?: number) {
        super(id);
        this._menuitem = menuItem;
        this._qty = qty;
    }

    public toJSON(): object {
        return this.id
            ? {
                  id: this.id,
                  menuitem: this.menuitem,
                  qty: this.qty,
              }
            : {
                  id: this.id,
                  menuitem: this.menuitem,
                  qty: this.qty,
              };
    }

    public static fromJSON(json: any): OrderItem {
        return new OrderItem(
            MenuItem.fromJSON(json['menuitem']),
            json['qty'],
            json['id']
        );
    }

    public get qty(): number {
        return this._qty;
    }

    public set qty(value: number) {
        this._qty = value;
    }

    public get menuitem(): MenuItem {
        return this._menuitem;
    }
}
