import '../CustomerAnalytics.css';
import { Order } from '../../../models';

interface UserDisplayProps {
    order: Order;
}

export default function UserOrderDisplay(props: UserDisplayProps) {
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
                    <button className="btn">View Order</button>
                </div>
            </div>
            <hr />
        </div>
    );
}
