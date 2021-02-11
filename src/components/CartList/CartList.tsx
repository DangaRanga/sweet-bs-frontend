import React, { Component } from "react";
import { OrderItem } from "../../models";
import { ShoppingCart } from "../../views";
import "./CartList.css";
import CartListItem from "./CartListItem/CartListItem";


interface CartListProps {
    shoppingCart: ShoppingCart
}

interface CartListState {
}

export default class CartList extends Component<CartListProps,CartListState> {

    private get cart(){
        return this.props.shoppingCart.state.cart;
    }

    render() {
        const list = this.cart.map(item=><CartListItem key={item.getId} item={item} shoppingCart={this.props.shoppingCart}/>)
        return (
            <div id='cart-list'>
                {list}
            </div>
        );
    }
}