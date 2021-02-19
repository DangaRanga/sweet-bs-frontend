import React, { Component } from 'react';
import { ShoppingCartController } from '../../controllers';
import './OrderSummary.css';

interface OrderSummaryProps {
    controller: ShoppingCartController;
}

interface OrderSummaryState {}

export default class OrderSummary extends Component<
    OrderSummaryProps,
    OrderSummaryState
> {
    render() {
        var list: JSX.Element[] = [];
        var total = 0;

        this.cart.items.forEach((oitem) => {
            list.push(
                <p key={`item-name-${oitem.menuitem.id}`} className="item-name">
                    {oitem.menuitem.fullName} 
                </p>
            );
            list.push(
                <p key={`item-qty-${oitem.menuitem.id}`} className="item-qty">
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
                <button className="btn filled primary" onClick={(e)=>{
                    this.props.controller.placeOrder()
                }}>
                    CHECKOUT
                </button>
            </div>
        );
    }

    private get cart() {
        return this.props.controller.appCtrl.cart;
    }
}
