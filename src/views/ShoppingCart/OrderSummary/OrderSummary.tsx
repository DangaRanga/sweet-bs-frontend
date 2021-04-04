import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../../../context';
import './OrderSummary.css';

interface OrderSummaryProps {
}

export default function OrderSummary(props: OrderSummaryProps) {
    var list: JSX.Element[] = [];
    var total = 0;
    const context = useContext(AppContext);

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
                    state: { fromCart: true },
                }}
            >
                <button
                    id="checkout-btn"
                    disabled={context.cart.length === 0}
                    className="btn filled primary"
                >
                    CHECKOUT
                </button>
            </Link>
        </div>
    );
}
