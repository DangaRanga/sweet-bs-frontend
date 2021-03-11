import React, { Component } from 'react';
import { Routes } from '..';
import { AppController } from '../../effects';
import { Admin, AppData, Customer, OrderItem } from '../../models';
import './App.css';

interface AppProps {}

interface AppState {
    cart: OrderItem[];
    user: Admin | Customer | undefined;
}

export default class App extends Component<AppProps, AppState> {
    private _controller!: AppController;

    readonly state: Readonly<AppState> = {
        cart: [],
        user: undefined,
    };

    componentDidMount(){
        this._controller = new AppController(this);
    }

    render() {
        return <Routes appCtrl={this._controller} />;
    }
}
