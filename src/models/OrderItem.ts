import MenuItem from './MenuItem';

class OrderItem {
    private item: MenuItem;
    private qty: number;

    constructor(menuItem: MenuItem, qty: number) {
        this.item = menuItem;
        this.qty = qty;
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
}
export default OrderItem;
