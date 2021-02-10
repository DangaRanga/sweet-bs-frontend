import React, { Component } from 'react';
import { OrderItem } from '../../models';
import './ShoppingCart.css';

interface ShoppingCartProps {}

interface ShoppingCartState {
    cart: OrderItem[];
}

export default class ShoppingCart extends Component<
    ShoppingCartProps,
    ShoppingCartState
> {
    render() {
        return <div id="cart"></div>;
    }
}
