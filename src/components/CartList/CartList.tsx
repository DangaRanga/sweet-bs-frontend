import React, { Component } from 'react';
import { ShoppingCartController } from '../../controllers';
import './CartList.css';
import CartListItem from '../CartListItem/CartListItem';

interface CartListProps {
    controller: ShoppingCartController;
}

interface CartListState {}

export default class CartList extends Component<CartListProps, CartListState> {
    private get cart() {
        return this.props.controller.appCtrl.cart;
    }

    render() {
        const list = this.cart.items.map((item) => {
            console.log(item.menuitem);

            return (
                <CartListItem
                    key={item.menuitem.id}
                    item={item}
                    controller={this.props.controller}
                />
            );
        });
        return <div id="cart-list">{list}</div>;
    }
}
