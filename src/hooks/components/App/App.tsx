import React, { Component } from 'react';
import { Routes } from '..';
import { AppController } from '../../controllers';
import {
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

    render() {
        return <Routes appCtrl={this._controller} />;
    }
}
