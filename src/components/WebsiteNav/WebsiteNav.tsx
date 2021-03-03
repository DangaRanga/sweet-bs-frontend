import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from "../../assets/CLIENT/Sweet B's Long.png";
import './WebsiteNav.css';
import {Icons} from "..";

interface WebsiteNavProps {}

interface WebsiteNavState {}

export default class WebsiteNav extends Component<
    WebsiteNavProps,
    WebsiteNavState
> {
    render() {
        return (
            <nav>
                <div id="main-nav">
                    <img src={logo} alt="SweetB's logo" />
                    <div className="right">
                        <Link id="menu-link" to="/menu">
                            Menu
                        </Link>
                        <Link id="cart-link" to="/cart">
                            <button className="btn primary filled">
                                <Icons.ShoppingCartHollow fill="white" />
                            </button>
                        </Link>
                        <div id="account-dropdown-section">
                            <button
                                id="accounts"
                                className="btn primary icon filled"
                                onClick={(e) => {
                                    const dropdown = document.getElementById(
                                        'account-dropdown'
                                    )!;
                                    dropdown.classList.toggle('hidden');
                                }}
                            >
                                <Icons.PersonCircleInverted fill="white"/>
                            </button>
                            <div id="account-dropdown" className="hidden">
                                <Link to="/signup">Sign Up</Link>
                                <hr />
                                <Link to="/login">Login</Link>
                                <hr />
                                <Link to="/profile">My Profile</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
}
