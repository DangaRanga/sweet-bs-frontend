import React from 'react';
import './EmptyCart.css';
import EmptyImg from '../../../assets/images/empty.svg';
import { Link } from 'react-router-dom';

/**
 * A simple display with a call to action when the cart is empty
 * @returns The Empty cart component
 */
export default function EmptyCart() {
    return (
        <div id="empty-cart">
            <img src={EmptyImg} alt="Empty Cart" />
            <h1>Your cart is empty</h1>
            <Link to="/menu">
                <button className="btn primary filled">Go To Menu</button>
            </Link>
        </div>
    );
}
