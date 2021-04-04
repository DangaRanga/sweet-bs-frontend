import React, { useContext } from 'react';
import './CartListItem.css';
import placeholder from '../../../assets/cart_placeholder.png';
import { OrderItem } from '../../../models';
import { AppContext } from '../../../context';

interface CartListItemProps {
    item: OrderItem;
}

export default function CartListItem(props: CartListItemProps) {

    const context = useContext(AppContext);

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
                        context.updateCart({
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
                        context.updateCart({
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
                    context.updateCart({ type: 'remove', item: props.item })
                }
            >
                x
            </button>
        </div>
    );
}
