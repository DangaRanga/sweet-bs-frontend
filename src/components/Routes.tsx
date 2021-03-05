import { Switch, Route, BrowserRouter } from 'react-router-dom';
import React, { Component } from 'react';
import { Menu, NotFound, ShoppingCart } from '../views';
import { AppController } from '../controllers';

interface RoutesProps {
    appCtrl: AppController;
}

interface RoutesState {}

export default class Routes extends Component<RoutesProps, RoutesState> {
    render() {
        return (
            <BrowserRouter forceRefresh={false}>
                <Switch>
                    <Route exact path="/cart">
                        <ShoppingCart
                            appCtrl={this.props.appCtrl}
                        ></ShoppingCart>
                    </Route>
                    <Route exact path="/menu">
                        <Menu appCtrl={this.props.appCtrl}></Menu>
                    </Route>
                    <Route>
                        <NotFound />
                    </Route>
                </Switch>
            </BrowserRouter>
        );
    }
}
