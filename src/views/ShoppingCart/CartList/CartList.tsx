import React, { useContext } from 'react';
import './CartList.css';
import CartListItem from '../CartListItem/CartListItem';
import { AppContext } from '../../../context';

interface CartListProps {
}

export default function CartList(props: CartListProps) {

    const context = useContext(AppContext);

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
