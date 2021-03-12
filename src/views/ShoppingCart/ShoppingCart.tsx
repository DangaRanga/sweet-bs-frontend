import React from 'react';
import { Link } from 'react-router-dom';
import { AppHooks } from '../../hooks';
import { ShoppingCartData } from '../../models/AppData';
import CartList from './CartList/CartList';
import EmptyCart from './EmptyCart/EmptyCart';
import OrderSummary from './OrderSummary/OrderSummary';
import './ShoppingCart.css';

interface ShoppingCartProps {
    updateCart: AppHooks.CartUpdater;
    cart: ShoppingCartData;
}

export default function ShoppingCart(props: ShoppingCartProps) {
    return (
        <div id="cart">
            <main>
                <Link to="/menu" className="nav">
                    Back to Menu
                </Link>
                <h2 className="pgtitle">My Order</h2>
                {props.cart.length > 0 ? (
                    <CartList cart={props.cart} updateCart={props.updateCart} />
                ) : (
                    <EmptyCart />
                )}
            </main>
            <aside>
                <OrderSummary cart={props.cart} />
            </aside>
        </div>
    );
}
