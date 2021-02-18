import React, { Component } from 'react';
import { OrderItem } from '../../models';
import { ShoppingCart } from '../../views';
import './OrderSummary.css';

interface OrderSummaryProps {
    shoppingCart: ShoppingCart;
}

interface OrderSummaryState {}

export default class OrderSummary extends Component<
    OrderSummaryProps,
    OrderSummaryState
> {
    render() {
        var list: JSX.Element[] = [];
        var total = 0;

        this.cart.forEach((oitem) => {
            list.push(
                <p key={`item-name-${oitem.id}`} className="item-name">
                    {oitem.menuitem.fullName} 
                </p>
            );
            list.push(
                <p key={`item-qty-${oitem.id}`} className="item-qty">
                    x{oitem.qty}
                </p>
            );

            total += oitem.menuitem.price * oitem.qty;
        });
        return (
            <div id="order-summary">
                <h1>Order Summary</h1>
                <div className="items">{list}</div>
                <div className="total-line">
                    <p>Total</p>
                    <p>${total}</p>
                </div>
                <a href="" className="btn filled">
                    CHECKOUT
                </a>
            </div>
        );
    }

    private get cart() {
        return this.props.shoppingCart.state.cart;
    }
}
