import React, { useState, useEffect } from 'react';

import moment from 'moment';

import { OrderModal } from '../OrderModal';
import { Spinner } from '../../';

import './OrderList.css';

interface OrderListProps {}

function OrderList(props: OrderListProps) {
    // Initialize State values
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);

    const url = `http://localhost:9090/orders`;

    useEffect(() => {
        const fetchOrders = async () => {
            return await fetch(url)
                .then((response) => response.json())
                .then((response) => setOrders(response))
                .catch((err) => console.error(err));
        };
        fetchOrders();
        setLoading(false);
    }, []);

    return (
        <div>
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
                        <div className="order-list-row">
                            <ul>
                                <li> {order['id']}</li>
                                <li>
                                    {' '}
                                    {order['complete']
                                        ? 'Delivered'
                                        : 'In Progress'}{' '}
                                </li>
                                <li> {order['user']['name']}</li>
                                <li> {order['user']['address']} </li>
                                <li> $500 </li>
                                <li>
                                    {' '}
                                    {moment(order['created_on']).format(
                                        'DD/MM/YY'
                                    )}
                                </li>
                            </ul>
                            <hr className="collator-list-divider" />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default OrderList;
