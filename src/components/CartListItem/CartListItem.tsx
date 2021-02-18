import React, { Component } from 'react';
import './CartListItem.css';
import placeholder from '../../assets/cart_placeholder.png';
import { ShoppingCartController } from '../../controllers';
import { OrderItem } from '../../models';

interface CartListItemProps {
    item: OrderItem;
    controller: ShoppingCartController;
}

interface CartListItemState {}

export default class CartListItem extends Component<
    CartListItemProps,
    CartListItemState
> {

    render() {
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
                        {this.props.item.menuitem.fullName}
                    </p>
                    <p className="desc">{this.props.item.menuitem.description}</p>
                </div>
                <div className="counter">
                    <button
                        className="btn outline icon"
                        onClick={(e) => {
                            this.props.controller.appCtrl.decreaseItemQty(this.props.item);
                        }}
                    >
                        -
                    </button>
                    <p className="qty">{this.props.item.qty}</p>
                    <button
                        className="btn filled icon"
                        onClick={(e) => {
                            this.props.controller.appCtrl.increaseItemQty(this.props.item);
                        }}
                    >
                        +
                    </button>
                </div>
                <p className="price">
                    {this.props.item.menuitem.price * this.props.item.qty}
                </p>
                <button
                    className="btn filled icon"
                    onClick={(e) => {
                        this.props.controller.appCtrl.removeItem(this.props.item);
                    }}
                >
                    x
                </button>
            </div>
        );
    }
}
