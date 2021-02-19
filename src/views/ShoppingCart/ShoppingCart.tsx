import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { CartList, EmptyCart, OrderSummary } from '../../components';
import { AppController, ShoppingCartController } from '../../controllers';
import './ShoppingCart.css';

interface ShoppingCartProps {
    appCtrl: AppController;
}

interface ShoppingCartState {}

export default class ShoppingCart extends Component<
    ShoppingCartProps,
    ShoppingCartState
> {
    private _controller: ShoppingCartController;

    constructor(props: ShoppingCartProps) {
        super(props);
        this._controller = new ShoppingCartController(this, this.props.appCtrl);
    }

    render() {
        return (
            <div id="cart">
                <main>
                    <Link to="/menu" className="nav">
                        Back to Menu
                    </Link>
                    <h2 className="pgtitle">My Order</h2>
                    {!this._controller.appCtrl.isCartEmpty ? (
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
