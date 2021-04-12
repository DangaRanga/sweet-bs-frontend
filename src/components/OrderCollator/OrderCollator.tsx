import React from 'react';

import { OrderList } from './OrderList';

import './OrderCollator.css';

interface OrderCollatorProps {}

function OrderCollator() {
    return (
        <div id="order-collator">
            <h1>Order Analytics</h1>
            <OrderList></OrderList>
        </div>
    );
}

export default OrderCollator;
