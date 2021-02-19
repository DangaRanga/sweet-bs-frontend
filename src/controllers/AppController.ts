
import { App } from '../components';
import {
    MenuItem,
    OrderItem,
    ShoppingCartData,
    User,
} from '../models';

export default class AppController {
    private _app: App;

    constructor(app: App) {
        this._app = app;
    }

    private updateCart(newCart: OrderItem[]): void {
        localStorage.setItem('cart', new ShoppingCartData(newCart).localStorageFormat);
    }

    public addToCart(menuitem: MenuItem, qty: number): void {
        this._app.setState((prevState, prevProps) => {
            var newCartItems = [...prevState.cart.items];
            var index = newCartItems.findIndex(
                (v) => v.menuitem.id === menuitem.id
            );
            if (index === -1) {
                newCartItems.push(new OrderItem(menuitem, qty));
            } else {
                newCartItems[index].qty += qty;
            }
            this.updateCart(newCartItems);
            return { cart: new ShoppingCartData(newCartItems) };
        });
    }

    public increaseItemQty(item: OrderItem): void {
        this._app.setState((prevState, prevProps) => {
            var newCartItems = [...prevState.cart.items];
            var i = newCartItems.findIndex(
                (oitem) => oitem.menuitem.id === item.menuitem.id
            );
            var oitem = newCartItems[i];
            console.log(oitem.qty);
            oitem.qty += 1;
            console.log(oitem.qty);
            newCartItems[i] = oitem;
            this.updateCart(newCartItems);
            return { cart: new ShoppingCartData(newCartItems) };
        });
    }

    public decreaseItemQty(item: OrderItem): void {
        this._app.setState((prevState, prevProps) => {
            var newCartItems = [...prevState.cart.items];
            var i = newCartItems.findIndex(
                (oitem) => oitem.menuitem.id === item.menuitem.id
            );
            var oitem = newCartItems[i];
            console.log(oitem.qty);
            if (oitem.qty > 1) {
                oitem.qty -= 1;
            }
            console.log(oitem.qty);
            newCartItems[i] = oitem;
            this.updateCart(newCartItems);
            return { cart: new ShoppingCartData(newCartItems) };
        });
    }

    public removeItem(item: OrderItem): void {
        this._app.setState((prevState, prevProps) => {
            var newCart = [...prevState.cart.items];
            console.log(newCart);

            newCart = newCart.filter(
                (oitem) => oitem.menuitem.id !== item.menuitem.id
            );

            console.log(newCart);

            this.updateCart(newCart);
            return { cart: new ShoppingCartData(newCart) };
        });
    }

    public get isCartEmpty(): boolean {
        return this._app.state.cart.items.length === 0;
    }

    public get cart(): ShoppingCartData {
        return this._app.state.cart;
    }

    public set cart(value:ShoppingCartData){
        this._app.setState({cart:value});
        localStorage.setItem('cart', value.localStorageFormat);
    }

    public get user(): User | undefined {
        return this._app.state.user;
    }

    public set user(value: User | undefined) {
        if (this.user === undefined && value !== undefined) {
            console.log("hi");
            this._app.setState({ user: value });
            localStorage.setItem('user', value.localStorageFormat);
        }
        if (this.user !== undefined && value === undefined) {
            this._app.setState({ user: value });
            localStorage.removeItem('user');
        } else {
            //throw new Error('Logout first!');
        }
    }
}
