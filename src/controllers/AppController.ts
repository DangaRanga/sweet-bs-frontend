import { App } from '../components';
import {
    Admin,
    Customer,
    MenuItem,
    Order,
    OrderItem,
    ShoppingCartData,
    User,
} from '../models';

/**
 * Manages the global state of the app. That includes the shopping cart and the logged in user.
 */
export default class AppController {
    /** The app */
    private _app: App;

    /**
     * Initializes an AppController instance
     * @param app The app to attach the controller to
     */
    constructor(app: App) {
        this._app = app;
        // fetch the cart and user from local storage
        var cart = this.localCart;
        var user = this.localUser;

        // if there is no cart set a new empty cart
        if (!cart) {
            cart = new ShoppingCartData();
        }

        // set app state
        this._app.setState({ user: user, cart: cart });
    }

    /**
     * Adds a new menu item with a specified quantity to the cart if the menu item isn't already in the cart.
     * If the menuitem is in the cart, increase the quantity by `qty`
     *
     * @param menuitem Menu item selected by a user to be added to cart
     * @param qty the quantity of that menu item to be added
     */
    public addItemToCart(menuitem: MenuItem, qty: number): void {
        this._app.setState((prevState, prevProps) => {
            // duplicate the existing cart
            var newCartItems = [...prevState.cart.items];
            // check if the menu item already exists in the cart by id since ids are unique
            var index = newCartItems.findIndex(
                (v) => v.menuitem.id === menuitem.id
            );
            if (index === -1) {
                // add the new menu item if it is not in the cart
                newCartItems.push(new OrderItem(menuitem, qty));
            } else {
                // otherwise increase the quantity
                newCartItems[index].qty += qty;
            }
            // update the cart in local storage as well as the app state
            var cart = new ShoppingCartData(newCartItems);
            this.localCart = cart;
            return { cart: cart };
        });
    }

    /**
     * Increases the quantity of the specified cart item by 1
     * @param item An item in the cart whose quantity the user wants to adjust
     */
    public incrementItemQty(item: OrderItem): void {
        this._app.setState((prevState, prevProps) => {
            // duplicate the existing cart
            var newCartItems = [...prevState.cart.items];
            // find the item in the cart
            var i = newCartItems.findIndex(
                (oitem) => oitem.menuitem.id === item.menuitem.id
            );
            // increase that item's quantity
            newCartItems[i].qty += 1;
            // update the cart in local storage as well as the app state
            var cart = new ShoppingCartData(newCartItems);
            this.localCart = cart;
            return { cart: cart };
        });
    }

    /**
     * Decreases the quantity of the specified cart item by 1 but only if the current quantity is greater than 1
     * @param item An item in the cart whose quantity the user wants to adjust
     */
    public decrementItemQty(item: OrderItem): void {
        this._app.setState((prevState, prevProps) => {
            // duplicate the existing cart
            var newCartItems = [...prevState.cart.items];
            // find the item in the cart
            var i = newCartItems.findIndex(
                (oitem) => oitem.menuitem.id === item.menuitem.id
            );
            var oitem = newCartItems[i];
            if (oitem.qty > 1) {
                // decrease that item's quantity if the quantity if greater than 1
                oitem.qty -= 1;
            }
            newCartItems[i] = oitem;
            // update the cart in local storage as well as the app state
            var cart = new ShoppingCartData(newCartItems);
            this.localCart = cart;
            return { cart: cart };
        });
    }

    /**
     * Removes an item from the cart
     * @param item the item to be removed
     */
    public removeItem(item: OrderItem): void {
        this._app.setState((prevState, prevProps) => {
            // duplicate cart
            var newCart = [...prevState.cart.items];
            // filter out the item to be removed
            newCart = newCart.filter(
                (oitem) => oitem.menuitem.id !== item.menuitem.id
            );
            // update the cart in local storage as well as the app state
            var cart = new ShoppingCartData(newCart);
            this.localCart = cart;
            return { cart: cart };
        });
    }

    /**
     * Sends an order to the database for storage
     * @returns `true` if order was sent successfully and `false` otherwise
     */
    public async sendOrder(): Promise<boolean> {
        var success: boolean = false;
        // the items ordered
        var items: OrderItem[];
        //the customer making the order
        var user: Customer;
        // the new order to be sent
        var newOrder!: Order;

        /* uses the set state function to ensure 
        that the cart items sent to be backend 
        are the latest version of the cart */
        this._app.setState(
            (prevState, prevProps) => {
                // initialize the items to be sent to the database
                items = prevState.cart.items;
                user = prevState.user as Customer;
                newOrder = new Order(false, items, user);
            },
            () => {
                // After initialization, send the new order to the database
                fetch('http://0.0.0.0:9090/orders/add', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: newOrder.toJSON(),
                })
                    .then((res) => {
                        success = res.status === 201;
                    })
                    .catch((err) => console.log(err));
            }
        );
        return success;
    }

    /**
     * Completely empties the cart
     */
    public emptyCart(): void {
        var emptyCart = new ShoppingCartData();
        this._app.setState({ cart: emptyCart });
        this.localCart = emptyCart;
    }

    /**
     * The cart in local storage
     */
    private get localCart(): ShoppingCartData | undefined {
        var cartData = localStorage.getItem('cart');
        var cart = undefined;
        if (cartData) {
            var cartdataObj = JSON.parse(cartData);
            try {
                cart = new ShoppingCartData(
                    cartdataObj.map((v: any) => OrderItem.fromJSON(v))
                );
            } catch (e) {
                cart = new ShoppingCartData();
            }
        }
        return cart;
    }

    /**
     * The cart in local storage
     */
    private set localCart(cart: ShoppingCartData | undefined) {
        if (cart) {
            localStorage.setItem('cart', cart.localStorageFormat);
        } else {
            localStorage.removeItem('cart');
        }
    }

    public get cartItems(): OrderItem[] {
        return this.localCart?.items ?? [];
    }

    public get cartItemCount(): number {
        return this.localCart?.itemCount ?? 0;
    }

    /**
     * The user in local storage
     */
    private get localUser(): User | undefined {
        var userData = localStorage.getItem('user');
        var user: User | undefined = undefined;
        if (userData) {
            try {
                user = Customer.fromJSON(JSON.parse(userData));
            } catch (e) {
                try {
                    user = Admin.fromJSON(JSON.parse(userData));
                } catch (e) {
                    user = undefined;
                }
            }
        }
        return user;
    }

    private set localUser(user: User | undefined) {
        if (user && !this.localUser) {
            localStorage.setItem('user', user.localStorageFormat);
        } else if (!user && this.localUser) {
            localStorage.removeItem('user');
        } else {
            //throw new Error('Logout first!');
        }
    }

    /*  public get user(): User | undefined {
        return this._app.state.user;
    }

    public set user(value: User | undefined) {
        if (this.user === undefined && value !== undefined) {
            console.log('hi');
            this._app.setState({ user: value });
        }
        if (this.user !== undefined && value === undefined) {
            this._app.setState({ user: value });
        } else {
        }
    } */
}
