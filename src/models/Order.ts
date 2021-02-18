import { Customer, Model, OrderItem } from '.';
export default class Order extends Model {
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

    public toJSON(): object {
        return this.id
            ? {
                  id: this.id,
                  complete: this.complete,
                  items: this.items.map((v) => v.toJSON()),
                  user: this.user.toJSON(),
              }
            : {
                  complete: this.complete,
                  items: this.items.map((v) => v.toJSON()),
                  user: this.user.toJSON(),
              };
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
