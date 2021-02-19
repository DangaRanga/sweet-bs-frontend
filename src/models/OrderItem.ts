import { MenuItem } from '.';
import DbModel from './DbModel';

export default class OrderItem extends DbModel {
    private _menuitem: MenuItem;
    private _qty: number;
    private _order_id?: number | undefined;

    constructor(
        menuItem: MenuItem,
        qty: number,
        id?: number,
        order_id?: number
    ) {
        super(id);
        this._menuitem = menuItem;
        this._qty = qty;
        this._order_id = order_id;
    }

    public toObject(): object {
        return this.id
            ? {
                  id: this.id,
                  menuitem_id: this.menuitem.id,
                  menuitem: this.menuitem.toObject(),
                  qty: this.qty,
                  order_id: this.order_id,
              }
            : {
                  id: this.id,
                  menuitem_id: this.menuitem.id,
                  menuitem: this.menuitem.toObject(),
                  qty: this.qty,
                  order_id: this.order_id,
              };
    }

    public toJSON(): string {
        console.log(this.toObject());

        return JSON.stringify(this.toObject());
    }

    public static fromJSON(json: any): OrderItem {
        return new OrderItem(
            MenuItem.fromJSON(json['menuitem']),
            json['qty'],
            json['id']
        );
    }

    public get order_id(): number | undefined {
        return this._order_id;
    }
    public set order_id(value: number | undefined) {
        this._order_id = value;
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
