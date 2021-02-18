import { ShoppingCart } from '../views';
import ViewController from './ViewController';
import {AppController} from '.';

export default class ShoppingCartController extends ViewController {
    private _cartView: ShoppingCart;

    constructor(cart: ShoppingCart, app: AppController) {
        super(app);
        this._cartView = cart;
    }

    
}
