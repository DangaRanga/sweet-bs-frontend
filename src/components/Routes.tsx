import { Switch, Route, BrowserRouter } from 'react-router-dom';
import React, { Component } from 'react';
import { NotFound, ShoppingCart } from '../views';

interface RoutesProps {}

interface RoutesState {}

export default class Routes extends Component<RoutesProps, RoutesState> {
    render() {
        return (
            <BrowserRouter forceRefresh={false}>
                <Switch>
                    <Route exact path="/cart">
                        <ShoppingCart></ShoppingCart>
                    </Route>

                    <Route>
                        <NotFound />
                    </Route>
                </Switch>
            </BrowserRouter>
        );
    }
}
