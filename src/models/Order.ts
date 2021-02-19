import { Customer, OrderItem } from '.';
import DbModel from './DbModel';
export default class Order extends DbModel {
    private _complete: boolean;

    private _items: OrderItem[];

    private _user: Customer;

    constructor(
        complete: boolean,
        items: OrderItem[],
        user: Customer,
        id?: number
    ) {
        super(id);
        this._complete = complete;
        this._items = items;
        this._user = user;
    }
    public toObject(): object {
        return this.id
            ? {
                  id: this.id,
                  complete: this.complete,
                  items: this.items.map((v) => v.toObject()),
                  user_id: this.user.id,
              }
            : {
                  complete: this.complete,
                  items: this.items.map((v) => v.toObject()),
                  user_id: this.user.id,
              };
    }

    public toJSON(): string {
        return JSON.stringify(this.toObject());
    }

    public static fromJSON(json: any): Order {
        return new Order(
            json['complete'],
            json['items'].map((v: any) => OrderItem.fromJSON(v)),
            Customer.fromJSON(json['user']),
            json['id']
        );
    }


    public get complete(): boolean {
        return this._complete;
    }
    public set complete(value: boolean) {
        this._complete = value;
    }

    public get items(): OrderItem[] {
        return this._items;
    }

    public get user(): Customer {
        return this._user;
    }
}
