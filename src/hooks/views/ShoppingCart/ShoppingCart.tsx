import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { AppController, ShoppingCartController } from '../../effects';
import CartList from './CartList/CartList';
import EmptyCart from './EmptyCart/EmptyCart';
import OrderSummary from "./OrderSummary/OrderSummary";
import './ShoppingCart.css';

interface ShoppingCartProps {
}

interface ShoppingCartState {}

export default class ShoppingCart extends Component<
    ShoppingCartProps,
    ShoppingCartState
> {
    private _controller: ShoppingCartController;

    constructor(props: ShoppingCartProps) {
        super(props);
        this._controller = new ShoppingCartController(this, this);
    }

    render() {
        return (
            <div id="cart">
                <main>
                    <Link to="/menu" className="nav">
                        Back to Menu
                    </Link>
                    <h2 className="pgtitle">My Order</h2>
                    {!this._controller.isEmptyCart ? (
                        <CartList controller={this._controller} />
                    ) : (
                        <EmptyCart />
                    )}
                </main>
                <aside>
                    <OrderSummary controller={this._controller} />
                </aside>
            </div>
        );
    }
}
