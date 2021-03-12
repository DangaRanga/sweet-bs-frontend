import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './BackToCart.css';
import logo from "../../../../assets/CLIENT/Sweet B's Long.png";

interface BackToCartProps {}

interface BackToCartState {}

export default function BackToCart(props: BackToCartProps) {
    return (
        <div id="back-to-cart-error">
            <img src={logo} alt="Sweet B's" />
            <h1>We can't seem to find the order data :(</h1>
            <p>Are sure you checked out from the shopping cart?</p>
            <Link to="/cart">
                <button className="btn filled primary">Back to Cart</button>
            </Link>
        </div>
    );
}
