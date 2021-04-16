import React, { useContext } from 'react';
import './CartList.css';
import CartListItem from '../CartListItem/CartListItem';
import { AppContext } from '../../../context';

/**
 * The list of cart items displayed in the shopping cart view
 * @returns The cart list component
 */
export default function CartList() {

    const context = useContext(AppContext);

    // build the cart list from the cart
    const list = context.cart.map((item) => {
        return (
            <CartListItem
                key={item.menuitem.id}
                item={item}
            />
        );
    });
    return <div id="cart-list">{list}</div>;
}
