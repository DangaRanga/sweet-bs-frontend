import React from 'react';
import './CartListItem.css';
import placeholder from '../../../assets/cart_placeholder.png';
import { OrderItem } from '../../../models';
import { AppHooks } from '../../../hooks';

interface CartListItemProps {
    item: OrderItem;
    updateCart: AppHooks.CartUpdater;
}

export default function CartListItem(props: CartListItemProps) {
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
                    className="btn outline icon primary"
                    onClick={(e) =>
                        props.updateCart({
                            type: 'decrementQty',
                            item: props.item,
                        })
                    }
                >
                    -
                </button>
                <p className="qty">{props.item.qty}</p>
                <button
                    className="btn filled icon primary"
                    onClick={(e) =>
                        props.updateCart({
                            type: 'incrementQty',
                            item: props.item,
                        })
                    }
                >
                    +
                </button>
            </div>
            <p className="price">
                ${props.item.menuitem.price * props.item.qty}
            </p>
            <button
                className="btn filled icon primary"
                onClick={(e) =>
                    props.updateCart({ type: 'remove', item: props.item })
                }
            >
                x
            </button>
        </div>
    );
}
