import { ShoppingCart } from '../views';
import ViewController from './ViewController';
import { AppController } from '.';
import { Customer, Order } from '../models';

export default class ShoppingCartController extends ViewController {
    private _cartView: ShoppingCart;

    constructor(cart: ShoppingCart, app: AppController) {
        super(app);
        this._cartView = cart;
    }

    public placeOrder(): void {
        if (this.appCtrl.sendOrder()) {
            this.appCtrl.emptyCart();
        } else {
            console.log('failed');
        }
    }
}
