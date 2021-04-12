import React, { useState, useEffect } from 'react';

import moment from 'moment';

import { OrderItem } from './OrderItem';
import { Spinner } from '../../';

import './OrderList.css';

interface OrderListProps {}

function OrderList(props: OrderListProps) {
    // Initialize State values
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const url = `http://localhost:9090/orders`;
    let fetchedOrders: any = false;

    useEffect(() => {
        const fetchOrders = async () => {
            return await fetch(url)
                .then((response) => response.json())
                .then((response) => {
                    setOrders(response);
                    setLoading(false);
                })

                .catch((err) => console.error(err));
        };
        fetchOrders();
    }, []);

    return (
        <div>
            {/* Show the spinner whilst the data is being fetched */}
            {loading ? (
                <div id="loader">
                    <Spinner />
                </div>
            ) : (
                <div id="order-collator-list">
                    {console.log(orders)}
                    <h3>Order List</h3>
                    <hr className="collator-list-divider" />
                    <div id="order-list-header">
                        <ul>
                            <li> Order ID </li>
                            <li> Order Status </li>
                            <li> Customer Name </li>
                            <li> Customer Location </li>
                            <li> Order Total </li>
                            <li> Order Date </li>
                            <li> View Order </li>
                        </ul>
                        <hr className="collator-list-divider" />
                    </div>
                    {orders.map((order) => (
                        <OrderItem order={order} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default OrderList;
