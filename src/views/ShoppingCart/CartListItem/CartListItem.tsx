import React, { useContext } from 'react';
import './CartListItem.css';
import placeholder from '../../../assets/cart_placeholder.png';
import { OrderItem } from '../../../models';
import { AppContext } from '../../../context';
import { Icons } from '../../../components';

interface CartListItemProps {
    item: OrderItem;
}

export default function CartListItem(props: CartListItemProps) {
    const context = useContext(AppContext);
    const primaryColor = '#9377e2';

    return (
        <div className="cart-list-item">
            <img
                src={placeholder}
                //src={this.props.item.menuitem.imgUrl}
                alt=""
                className="item-img"
            />
            <div className="info">
                <p className="name">
                    {props.item.menuitem.flavour +
                        ' ' +
                        props.item.menuitem.category.name}
                </p>
                <p className="desc">{props.item.menuitem.description}</p>
            </div>
            <div className="counter">
                <button
                    className="btn transparent icon"
                    onClick={(e) =>
                        context.updateCart({
                            type: 'decrementQty',
                            item: props.item,
                        })
                    }
                >
                    <Icons.RemoveCircleOutline fill={primaryColor} />
                </button>
                <p className="qty">{props.item.qty}</p>
                <button
                    className="btn icon transparent"
                    onClick={(e) =>
                        context.updateCart({
                            type: 'incrementQty',
                            item: props.item,
                        })
                    }
                >
                    <Icons.AddCircle fill={primaryColor} />
                </button>
            </div>
            <p className="price">
                ${props.item.menuitem.price * props.item.qty}
            </p>
            <button
                className="btn icon transparent"
                onClick={(e) =>
                    context.updateCart({ type: 'remove', item: props.item })
                }
            >
                <Icons.Cancel fill={primaryColor} />
            </button>
        </div>
    );
}
