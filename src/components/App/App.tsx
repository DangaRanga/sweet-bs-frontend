import React, { Component } from 'react';
import { Routes } from '..';
import { AppController } from '../../controllers';
import { Admin, Customer, OrderItem, ShoppingCartData, User } from '../../models';
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

    componentDidMount(){
      var userData = localStorage.getItem('user');
        var user: User;
        var cartData = localStorage.getItem('cart');
        var cart: ShoppingCartData;
        if (userData) {
            try {
                user = Customer.fromJSON(JSON.parse(userData));
            } catch (e) {
                user = Admin.fromJSON(JSON.parse(userData));
            }
            this.setState({ user: user });
        }
        if (cartData) {
            cart = new ShoppingCartData(
                JSON.parse(cartData).map((v: any) => OrderItem.fromJSON(v))
            );
            this.setState({ cart: cart });
        }
    }

    render() {
        return <Routes appCtrl={this._controller} />;
    }
}
