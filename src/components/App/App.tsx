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
        var user: User;
        var cartData = localStorage.getItem('cart');
        console.log(userData);
        if (userData) {
            try {
                user = Customer.fromJSON(JSON.parse(userData));
            } catch (e) {
                try {
                    user = Admin.fromJSON(JSON.parse(userData));
                } catch (e) {
                    console.log(e);
                }
            }
        }
        if (cartData) {
            console.log(cartData);

            var cartdataObj = JSON.parse(cartData);
            console.log(cartdataObj);

            /*  cartdataObj = cartdataObj.map((v: any) =>
                JSON.parse(v)
            );
            console.log(cartdataObj); */

            try {
                this._controller.cart = new ShoppingCartData(
                    cartdataObj.map((v: any) => OrderItem.fromJSON(v))
                );
            } catch (e) {
                console.log(e);
                this._controller.cart = new ShoppingCartData();
            }
        }
        this._controller.user = new Customer(
            'ARich123',
            '\\x24326224313524496739415766517174436d5731477159784b6e64772e5a7631667673374d70347855506e3061446b45757379324b316a7238495143',
            'anakai.richards@gmail.com',
            'Anakai',
            'Richards',
            '2021-02-18T15:52:04.698362',
            '1789e432-7599-4d01-98e0-b06390d17b25',
            0,
            'address 1, city 2',
            1
        );
    }

    render() {
        return <Routes appCtrl={this._controller} />;
    }
}
