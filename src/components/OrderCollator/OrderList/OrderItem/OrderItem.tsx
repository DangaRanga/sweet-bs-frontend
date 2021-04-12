import React, { useState } from 'react';
import moment from 'moment';

interface UserFields {
    firstname: string;
    lastname: string;
    address: string;
}

interface OrderFields {
    id: number;
    complete: boolean;
    user: UserFields;
    created_on: Date;
}

interface OrderItemProps {
    order: OrderFields;
}

function OrderItem({ order: order }: OrderItemProps) {
    const [selected, setSelected] = useState(false);

    return (
        <article className="order-list-row">
            <section className="order-description">
                <ul>
                    <li> {order['id']}</li>
                    <li> {order['complete'] ? 'Delivered' : 'In Progress'} </li>
                    <li>
                        {' '}
                        {order['user']['firstname'] +
                            ' ' +
                            order['user']['lastname']}
                    </li>
                    <li> {order['user']['address']} </li>
                    <li> $500 </li>
                    <li> {moment(order['created_on']).format('DD/MM/YY')}</li>
                    <li>
                        <button className="collator-btn">View Order</button>
                    </li>
                </ul>
            </section>
            <section className="order-details">
                <ul></ul>
            </section>
        </article>
    );
}

export default OrderItem;
