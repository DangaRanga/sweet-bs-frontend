import { ShoppingCartData } from '../models/AppData';
import { MenuItem, Order, OrderItem } from '../models';
import { fromJSON, toJSON } from '../utils/JsonUtils';
import {  Reducer, useEffect, useReducer } from 'react';

/**
 * Hooks to manage the global app state
 */
namespace AppHooks {
    // TODO implement jwt
    export function useJWT() {}

    /**
     * The actions that may be take for every call of setCart
     */
    export type UpdateCartAction =
        | { type: 'add'; item: MenuItem; qty: number }
        | { type: 'remove' | 'incrementQty' | 'decrementQty'; item: OrderItem }
        | { type: 'empty' };

    export type CartUpdater = React.Dispatch<UpdateCartAction>;

    /**
     * Create a cart state to allow updating of the shopping cart in both app state and localStorage
     * @returns The cart state and corresponding setter
     */
    export function useCart() {
        function init(initial: ShoppingCartData) {
            var cart = fromJSON<ShoppingCartData>(
                localStorage.getItem('sweetbs-cart')
            );
            return cart ?? initial;
        }

        function reducer(cart: ShoppingCartData, action: UpdateCartAction) {
            switch (action.type) {
                case 'add':
                    return addItemToCart(cart, action.item, action.qty);
                case 'decrementQty':
                    return decrementItemQty(cart, action.item);
                case 'incrementQty':
                    return incrementItemQty(cart, action.item);
                case 'remove':
                    return removeItem(cart, action.item);
                case 'empty':
                    //Completely empties the cart

                    return [];
                default:
                    return cart;
            }
        }

        const [cart, updateCart] = useReducer<
            Reducer<ShoppingCartData, UpdateCartAction>,
            ShoppingCartData
        >(reducer, [], init);

        useEffect(() => {
            localStorage.setItem('sweetbs-cart', toJSON(cart) ?? '[]');
        }, [cart]);

        return <const>[cart, updateCart];
    }

    /**
     * Adds a new menu item with a specified quantity to the cart if the menu item isn't already in the cart.
     * If the menuitem is in the cart, increase the quantity by `qty`
     *
     * @param cart The cart to be updated
     * @param menuitem Menu item selected by a user to be added to cart
     * @param qty the quantity of that menu item to be added
     */
    function addItemToCart(
        cart: ShoppingCartData,
        menuitem: MenuItem,
        qty: number
    ): ShoppingCartData {
        // duplicate the existing cart
        var newCartItems = [...cart];
        // check if the menu item already exists in the cart by id since ids are unique
        var index = newCartItems.findIndex(
            (v) => v.menuitem.id === menuitem.id
        );

        if (index === -1) {
            // add the new menu item if it is not in the cart
            var item: OrderItem = { menuitem: menuitem, qty: qty };
            newCartItems.push(item);
        } else {
            // otherwise increase the quantity
            newCartItems[index].qty += qty;
        }
        // update the cart in local storage as well as the app state
        return newCartItems;
    }

    /**
     * Increases the quantity of the specified cart item by 1
     * @param cart the cart to be updated
     * @param item An item in the cart whose quantity the user wants to adjust
     */
    function incrementItemQty(
        cart: ShoppingCartData,
        item: OrderItem
    ): ShoppingCartData {
        // duplicate the existing cart
        var newCartItems = [...cart];
        // find the item in the cart
        var i = newCartItems.findIndex(
            (oitem) => oitem.menuitem.id === item.menuitem.id
        );
        // increase that item's quantity
        newCartItems[i].qty += 1;
        return newCartItems;
    }

    /**
     * Decreases the quantity of the specified cart item by 1 but only if the current quantity is greater than 1
     * @param cart the cart to be updated
     * @param item An item in the cart whose quantity the user wants to adjust
     */
    function decrementItemQty(
        cart: ShoppingCartData,
        item: OrderItem
    ): ShoppingCartData {
        // duplicate the existing cart
        var newCartItems = [...cart];
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
        return newCartItems;
    }

    /**
     * Removes an item from the cart
     * @param cart the cart to be updated
     * @param item the item to be removed
     */
    function removeItem(
        cart: ShoppingCartData,
        item: OrderItem
    ): ShoppingCartData {
        // duplicate cart
        var newCart = [...cart];
        // filter out the item to be removed
        newCart = newCart.filter(
            (oitem) => oitem.menuitem.id !== item.menuitem.id
        );
        return newCart;
    }

    /**
     * Sends an order to the database for storage
     * @returns `true` if order was sent successfully and `false` otherwise
     */
    async function sendOrder(
        cart: ShoppingCartData,
        jwt: string
    ): Promise<boolean> {
        var success: boolean = false;
        // the new order to be sent

        // initialize the items to be sent to the database
        var newOrder: Order = { complete: false, items: cart, jwt: '' };

        // After initialization, send the new order to the database
        success = await fetch('http://0.0.0.0:9090/orders/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: toJSON(newOrder),
        })
            .then((res) => res.status === 201)
            .catch((err) => {
                console.log(err);
                return false;
            });

        return success;
    }
}

export default AppHooks;
