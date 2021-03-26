import React from 'react';

import { OrderList } from './OrderList';

import './OrderCollator.css';

interface OrderCollatorProps {}

function OrderCollator() {
    return (
        <div id="order-collator">
            <OrderList></OrderList>
        </div>
    );
}

export default OrderCollator;
