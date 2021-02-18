import React, { Component } from 'react';
import { OrderItem } from '../../models';
import { ShoppingCart } from '../../pages';
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
                <p key={`item-name-${oitem.getId}`} className="item-name">
                    {oitem.getItem.getSelectedFlavour} {oitem.getItem.getName}
                </p>
            );
            list.push(
                <p key={`item-qty-${oitem.getId}`} className="item-qty">
                    x{oitem.getQty}
                </p>
            );

            total += oitem.getItem.price * oitem.getQty;
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
