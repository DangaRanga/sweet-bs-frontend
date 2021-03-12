import React, { Component } from 'react';
import './EmptyCart.css';
import EmptyImg from '../../../../assets/images/empty.svg';
import { Link } from 'react-router-dom';

interface EmptyCartProps {}

interface EmptyCartState {}

export default function EmptyCart(props: EmptyCartProps) {
    return (
        <div id="empty-cart">
            <img src={EmptyImg} alt="Empty Cart" />
            <h1>Your cart is empty</h1>
            <Link to="/menu">
                <button className="btn primary filled">Go To Menu</button>
            </Link>
        </div>
    );
}
