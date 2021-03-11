import { ShoppingCart } from '../views';
import ViewController from './ViewHooks';
import { OrderItem } from '../models';

export default class ShoppingCartController extends ViewController {
    private _cartView: any;

    constructor(cart: any, app: any) {
        super(app);
        this._cartView = cart;
    }

    public get cartItems(): OrderItem[] {
        return this.appCtrl.cartItems;
    }

    public get isEmptyCart(): boolean {
        return this.appCtrl.cartItemCount === 0;
    }

    public removeItem(item: OrderItem): void {
        this.appCtrl.removeItem(item);
    }

    public increaseItemQty(item: OrderItem): void {
        this.appCtrl.incrementItemQty(item);
    }

    public decreaseItemQty(item: OrderItem) {
        this.appCtrl.decrementItemQty(item);
    }
}
