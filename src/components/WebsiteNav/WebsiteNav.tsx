import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./WebsiteNav.css";


interface WebsiteNavProps {
}

interface WebsiteNavState {
}

export default class WebsiteNav extends Component<WebsiteNavProps,WebsiteNavState> {
    render() {
        return (
            <nav>
                <h1>Sweet B's</h1>
                <div>
                    <Link to="/menu">Menu</Link>
                    <Link to="/cart"><button className="btn primary filled">Cart</button></Link>
                    <Link to="/account"><button className="btn ptimary icon filled">My Account</button></Link>
                </div>
            </nav>
        );
    }
}