import { OrderItem } from '.';

export default class ShoppingCartData {
    private _items: OrderItem[];

    constructor(items?: OrderItem[]) {
        this._items = items ?? [];
    }

    public get items(): OrderItem[] {
        return this._items;
    }
    public set items(value: OrderItem[]) {
        this._items = value;
    }

    public get itemCount(): number {
        return this._items.length;
    }

    public get localStorageFormat(): string {
        return JSON.stringify(this._items.map((item) => item.toObject()));
    }
}
