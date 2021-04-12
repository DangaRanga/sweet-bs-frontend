import React from 'react';
import { useLocation } from 'react-router-dom';
import BackToCart from './BackToCart/BackToCart';
import EnterCard from './EnterCard/EnterCard';
import './ProcessOrder.css';

export default function ProcessOrder() {
    // check if the user checked out from cart
    const loc = useLocation<{ fromCart?: boolean }>();
    const hadCheckedOut = loc.state?.fromCart ?? false;

    return (
        <div id="process-order">
            {hadCheckedOut ? <EnterCard /> : <BackToCart />}
        </div>
    );
}
