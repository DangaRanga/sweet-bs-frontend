import React from 'react';
import './CartList.css';
import CartListItem from '../CartListItem/CartListItem';
import { ShoppingCartData } from '../../../models/AppData';
import { AppHooks } from '../../../hooks';

interface CartListProps {
    cart: ShoppingCartData;
    updateCart: AppHooks.CartUpdater;
}

export default function CartList(props: CartListProps) {
    const list = props.cart.map((item) => {
        return (
            <CartListItem
                key={item.menuitem.id}
                item={item}
                updateCart={props.updateCart}
            />
        );
    });
    return <div id="cart-list">{list}</div>;
}
