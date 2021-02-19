import React, { Component } from 'react';
import { Routes } from '..';
import { AppController } from '../../controllers';
import {
    Admin,
    Customer,
    OrderItem,
    ShoppingCartData,
    User,
} from '../../models';
import './App.css';

interface AppProps {}

interface AppState {
    cart: ShoppingCartData;
    user: User | undefined;
}

export default class App extends Component<AppProps, AppState> {
    private _controller: AppController;

    readonly state: Readonly<AppState> = {
        cart: new ShoppingCartData(),
        user: undefined,
    };

    constructor(props: AppProps) {
        super(props);
        this._controller = new AppController(this);
    }

    componentDidMount() {
        var userData = localStorage.getItem('user');
        var user: User | undefined;
        var cartData = localStorage.getItem('cart');
        if (userData) {
            try {
                user = Customer.fromJSON(JSON.parse(userData));
            } catch (e) {
                try {
                    user = Admin.fromJSON(JSON.parse(userData));
                } catch (e) {
                    user = undefined;
                }
            } finally {
                this.setState({ user: user });
            }
        }
        if (cartData) {
            var cartdataObj = JSON.parse(cartData);

            try {
                this._controller.cart = new ShoppingCartData(
                    cartdataObj.map((v: any) => OrderItem.fromJSON(v))
                );
            } catch (e) {
                console.log(e);
                this._controller.cart = new ShoppingCartData();
            }
        }
    }

    render() {
        return <Routes appCtrl={this._controller} />;
    }
}
