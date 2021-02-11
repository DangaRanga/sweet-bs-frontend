import React, { Component } from 'react';
import { OrderItem } from '../../../models';
import { ShoppingCart } from '../../../pages';
import './CartListItem.css';
import placeholder from '../../../assets/cart_placeholder.png';

interface CartListItemProps {
    item: OrderItem;
    shoppingCart: ShoppingCart;
}

interface CartListItemState {}

export default class CartListItem extends Component<
    CartListItemProps,
    CartListItemState
> {
    /* readonly state: Readonly<CartListItemState>={
        item: this.props.item
    } */

    render() {
        return (
            <div className="cart-list-item">
                <img
                    src={placeholder}
                    //src={this.props.item.getItem.getImgUrl}
                    alt=""
                    className="item-img"
                />
                <div className="info">
                    <p className="name">
                        {this.props.item.getItem.getSelectedFlavour}{' '}
                        {this.props.item.getItem.getName}
                    </p>
                    <p className="desc">{this.props.item.getItem.getDesc}</p>
                </div>
                <div className="counter">
                    <button
                        className="btn outline icon"
                        onClick={(e) => {
                            this.props.shoppingCart.setState((prev, props) => {
                                var newCart = [...prev.cart];
                                var i = newCart.findIndex(
                                    (oitem) =>
                                        oitem.getId === this.props.item.getId
                                );
                                var oitem = newCart[i];
                                console.log(oitem.getQty);
                                if (oitem.getQty > 1) {
                                    oitem.setQty = oitem.getQty - 1;
                                }
                                console.log(oitem.getQty);
                                newCart.splice(i, 1, oitem);
                                return { cart: newCart };
                            });
                        }}
                    >
                        -
                    </button>
                    <p className="qty">{this.props.item.getQty}</p>
                    <button
                        className="btn filled icon"
                        onClick={(e) => {
                            this.props.shoppingCart.setState((prev, props) => {
                                var newCart = [...prev.cart];
                                var i = newCart.findIndex(
                                    (oitem) =>
                                        oitem.getId === this.props.item.getId
                                );
                                var oitem = newCart[i];
                                console.log(oitem.getQty);
                                oitem.setQty = oitem.getQty + 1;
                                //console.log(oitem.getQty);
                                newCart.splice(i, 1, oitem);
                                return { cart: newCart };
                            });
                        }}
                    >
                        +
                    </button>
                </div>
                <p className="price">
                    {this.props.item.getItem.getPrice * this.props.item.getQty}
                </p>
                <button
                    className="btn filled icon"
                    onClick={(e) => {
                        this.props.shoppingCart.setState((prev, props) => {
                            var newCart = [...prev.cart];
                            newCart = newCart.filter(
                                (oitem) => oitem.getId !== this.props.item.getId
                            );
                            return { cart: newCart };
                        });
                    }}
                >
                    x
                </button>
            </div>
        );
    }
}
