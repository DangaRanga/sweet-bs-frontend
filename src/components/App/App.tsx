// React Imports
import React, { useEffect } from 'react';
import {
    Switch,
    Route,
    BrowserRouter,
    RouteComponentProps,
} from 'react-router-dom';

// Views Imports
import {
    Menu,
    MyAccount,
    NotFound,
    ProcessOrder,
    ShoppingCart,
    ManagementPortal,
} from '../../views';

// Component Imports
import { OrderCollator, Dashboard } from '..';

import { AppHooks } from '../../hooks';
import './App.css';

export default function App() {
    const [cart, updateCart] = AppHooks.useCart();
    const [jwt, updateJWT] = AppHooks.useJWT();

    return (
        <BrowserRouter forceRefresh={false}>
            <Switch>
                <Route exact path="/cart">
                    <ShoppingCart cart={cart} updateCart={updateCart} />
                </Route>
                <Route exact path="/menu">
                    <Menu updateCart={updateCart} />
                </Route>
                <Route exact path="/profile">
                    <MyAccount />
                </Route>
                <Route
                    exact
                    path="/processorder"
                    render={(props: RouteComponentProps<any, any, any>) => (
                        <ProcessOrder
                            cart={cart}
                            jwt={jwt}
                            updateCart={updateCart}
                            history={props.history}
                            location={props.location}
                            match={props.match}
                            staticContext={props.staticContext}
                        />
                    )}
                ></Route>
                <Route exact path="/portal/">
                    <ManagementPortal portalComponent={Dashboard} />
                </Route>
                <Route exact path="/portal/orders">
                    <ManagementPortal portalComponent={OrderCollator} />
                </Route>
                <Route>
                    <NotFound />
                </Route>
            </Switch>
        </BrowserRouter>
    );
}
