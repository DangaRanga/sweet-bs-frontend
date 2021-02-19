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
        var items = this.appCtrl.cart.items;
        var user = this.appCtrl.user;
        var newOrder = Order.newEmptyOrder(user as Customer);
        //console.log(newOrder);
        fetch('http://0.0.0.0:9090/orders/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: newOrder.toJSON(),
        })
            .then((res) => res.json())
            .then((data) => {
                items.forEach((item) => (item.order_id = data['id']));
                console.log(items);
                
                var itemsjson = items.map((item) => item.toJSON());
                fetch('http://0.0.0.0:9090/orderitems/add', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(itemsjson),
                });
            });
    }
}
