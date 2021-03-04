import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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

        this.props.controller.cartItems.forEach((oitem) => {
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
                <Link
                    id="checkout-link"
                    to={{
                        pathname: '/processorder',
                        state: { fromCart: true },
                    }}
                >
                    <button
                        id="checkout-btn"
                        disabled={this.props.controller.isEmptyCart}
                        className="btn filled primary"
                    >
                        CHECKOUT
                    </button>
                </Link>
            </div>
        );
    }
}
