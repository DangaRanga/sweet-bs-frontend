import {
    Switch,
    Route,
    BrowserRouter,
    RouteComponentProps,
} from 'react-router-dom';
import React, { Component } from 'react';
import {
    Menu,
    MyAccount,
    NotFound,
    ProcessOrder,
    ShoppingCart,
} from '../views';
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
                    <Route exact path="/profile">
                        <MyAccount />
                    </Route>
                    <Route
                        exact
                        path="/processorder"
                        render={(props: RouteComponentProps<any, any, any>) => (
                            <ProcessOrder
                                appCtrl={this.props.appCtrl}
                                history={props.history}
                                location={props.location}
                                match={props.match}
                                staticContext={props.staticContext}
                            />
                        )}
                    ></Route>

                    <Route>
                        <NotFound />
                    </Route>
                </Switch>
            </BrowserRouter>
        );
    }
}
