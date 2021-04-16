import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../../../context';
import './OrderSummary.css';

/**
 * A condensed list of all the items in the cart and their quantities
 * @returns The Order summary component
 */
export default function OrderSummary() {
    var list: JSX.Element[] = [];
    var total = 0;
    const context = useContext(AppContext);

    // build list of order items from the cart
    context.cart.forEach((oitem) => {
        list.push(
            <p key={`item-name-${oitem.menuitem.id}`} className="item-name">
                {oitem.menuitem.flavour + ' ' + oitem.menuitem.category.name}
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
                    state: { fromCart: true }, // used to ensure that the user checked out intentionally from the cart
                }}
            >
                <button
                    id="checkout-btn"
                    disabled={context.cart.length === 0} // disable the checkout button if the cart is empty
                    className="btn filled primary"
                >
                    CHECKOUT
                </button>
            </Link>
        </div>
    );
}
