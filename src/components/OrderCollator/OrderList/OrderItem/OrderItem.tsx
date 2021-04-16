import React, { useState } from 'react';
import moment from 'moment';

import './OrderItem.css';
import { MenuItemCategory } from '../../../../models';

interface UserFields {
    firstname: string;
    lastname: string;
    address: string;
}

interface MenuItemItem {
    description: string;
    flavour: string;
    price: number;
    category: MenuItemCategory;
}

interface MenuItemFields {
    id: number;
    menuitem: MenuItemItem;
    qty: number;
}

interface OrderFields {
    id: number;
    complete: boolean;
    user: UserFields;
    created_on: Date;
    items: MenuItemFields[];
}

interface OrderItemProps {
    order: OrderFields;
}

function OrderItem({ order: order }: OrderItemProps) {
    const [selected, setSelected] = useState(false);
    let total = 0;
    order.items.map((item) => {
        total += item.menuitem.price * item.qty;
    });
    total = (total * 100) / 100;

    return (
        <article className="order-list-row">
            <section className="order-description">
                <ul>
                    <li> {order.id}</li>
                    <li> {order.complete ? 'Delivered' : 'In Progress'} </li>
                    <li> {order.user.firstname + ' ' + order.user.lastname}</li>
                    <li> {order.user.address} </li>
                    <li> ${total} </li>

                    {/* Convert the date into a readable form */}
                    <li> {moment(order.created_on).format('DD/MM/YY')}</li>
                    <li>
                        <button
                            className="collator-btn"
                            onClick={() => setSelected(!selected)}
                        >
                            {selected ? 'Hide Order' : 'View Order'}
                        </button>
                    </li>
                </ul>
            </section>

            {/* Apply selected class when button is clicked */}
            <section
                className={`order-details ${selected ? '' : 'not-selected'}`}
            >
                {order.items.map((menuitem) => (
                    <ul>
                        <li>
                            Item:{' '}
                            {menuitem.menuitem.flavour +
                                ' ' +
                                menuitem.menuitem.category.name}
                        </li>
                        <li>Quantity: {menuitem.qty}</li>
                        <li>Flavour: {menuitem.menuitem.flavour}</li>
                        <li>Price: ${menuitem.menuitem.price}</li>
                    </ul>
                ))}
            </section>
            <hr className="collator-list-divider" />
        </article>
    );
}

export default OrderItem;
