import MenuItem from './MenuItem';

class OrderItem {
    private item: MenuItem;
    private qty: number;
    private static counter: number = 0;
    private id: number;

    constructor(menuItem: MenuItem, qty: number) {
        this.item = menuItem;
        this.qty = qty;
        this.id = OrderItem.counter++;
    }

    public get getQty(): number {
        return this.qty;
    }

    public set setQty(value: number) {
        this.qty = value;
    }

    public get getItem(): MenuItem {
        return this.item;
    }

    public get getId(): number {
        return this.id;
    }
}
export default OrderItem;
