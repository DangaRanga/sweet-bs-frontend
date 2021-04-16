import React, { useContext } from 'react';
import './CartListItem.css';
import placeholder from '../../../assets/cart_placeholder.png';
import { OrderItem } from '../../../models';
import { AppContext } from '../../../context';
import { Icons } from '../../../components';

interface CartListItemProps {
    item: OrderItem;
}

/**
 * An item the cart list
 * @param item The cart item to display
 * @returns The Cartlist Item component
 */
export default function CartListItem({ item }: CartListItemProps) {
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
                    {item.menuitem.flavour + ' ' + item.menuitem.category.name}
                </p>
                <p className="desc">{item.menuitem.description}</p>
            </div>
            <div className="counter">
                <button
                    className="btn transparent icon"
                    onClick={(e) =>
                        context.updateCart({
                            type: 'decrementQty',
                            item: item,
                        })
                    }
                >
                    <Icons.RemoveCircleOutline fill={primaryColor} />
                </button>
                <p className="qty">{item.qty}</p>
                <button
                    className="btn icon transparent"
                    onClick={(e) =>
                        context.updateCart({
                            type: 'incrementQty',
                            item: item,
                        })
                    }
                >
                    <Icons.AddCircle fill={primaryColor} />
                </button>
            </div>
            <p className="price">${item.menuitem.price * item.qty}</p>
            <button
                className="btn icon transparent"
                onClick={(e) =>
                    context.updateCart({ type: 'remove', item: item })
                }
            >
                <Icons.Cancel fill={primaryColor} />
            </button>
        </div>
    );
}
