import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from "../../assets/CLIENT/Sweet B's Long dark.png";
import { PersonRounded, ShoppingCartRounded } from '@material-ui/icons';
import './WebsiteNav.css';

interface WebsiteNavProps {}

interface WebsiteNavState {}

export default class WebsiteNav extends Component<
    WebsiteNavProps,
    WebsiteNavState
> {
    render() {
        return (
            <nav>
                <img src={logo} alt="SweetB's logo"/>
                <div>
                    <Link to="/menu">Menu</Link>
                    <Link to="/cart">
                        <button className="btn primary filled">
                            <ShoppingCartRounded htmlColor={'white'} />
                        </button>
                    </Link>
                    <Link id="account-link" to="/account">
                        <button className="btn ptimary icon outline">
                            <PersonRounded htmlColor={'#9377e2'} />
                        </button>
                    </Link>
                </div>
            </nav>
        );
    }
}
