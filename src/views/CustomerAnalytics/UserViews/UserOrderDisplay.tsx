import '../CustomerAnalytics.css';
import { Order } from '../../../models';
import { useState } from 'react';

interface UserDisplayProps {
    order: Order;
}

export default function UserOrderDisplay(props: UserDisplayProps) {
    const [selected, setSelected] = useState(false);
    let total = 0;
    props.order.items.map((item) => {
        total += item.menuitem.price * item.qty;
    });
    total = (total * 100) / 100;

    return (
        <div>
            <div className="customer-order-info">
                <p>{props.order.id}</p>
                <p>{props.order.complete ? 'Delivered' : 'In Progress'}</p>
                <p>${total}</p>
                <p>
                    {props.order.created_on === undefined
                        ? ''
                        : props.order.created_on
                              .toString()
                              .substring(0, 10)
                              .replace(/-/g, '/')}
                </p>
                <div>
                    <button
                        onClick={() => setSelected(!selected)}
                        className="btn"
                    >
                        {selected ? 'Hide Order' : 'View Order'}
                    </button>
                </div>
            </div>
            <section
                className={`order-details ${selected ? '' : 'not-selected'}`}
            >
                {props.order.items.map((menuitem) => (
                    <ul>
                        <li>
                            Item:{' '}
                            {menuitem.menuitem.flavour +
                                ' ' +
                                menuitem.menuitem.category.name}
                        </li>
                        <li>Quantity: {menuitem.qty}</li>
                        <li>Unit Price: ${menuitem.menuitem.price}</li>
                        <br />
                    </ul>
                ))}
            </section>
            <hr />
        </div>
    );
}
