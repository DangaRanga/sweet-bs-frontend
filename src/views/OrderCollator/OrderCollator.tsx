import React from 'react';

import { PortalNav } from '../../components';

import { OrderList } from './OrderList';

import './OrderCollator.css';

interface OrderCollatorProprs {}

function OrderCollator() {
    return (
        <div id="order-collator">
            <PortalNav></PortalNav>
            <OrderList></OrderList>
        </div>
    );
}

export default OrderCollator;
