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
    CustomerAnalytics,
    ShoppingList,
} from '../../views';

// Component Imports
import { OrderCollator, Dashboard } from '..';

import { AppHooks } from '../../hooks';
import './App.css';
import { Success } from '../../views/ProcessOrder/Success/Success';

export default function App() {
    const [cart, updateCart] = AppHooks.useCart();
    const [jwt, updateJWT] = AppHooks.useJWT();

    /* updateJWT({
        type: 'login',
        username: 'ARich123',
        password: 't#st123',
    }); */

    //console.log(jwt);

    return (
        <BrowserRouter forceRefresh={false}>
            <Switch>
                <Route exact path="/cart">
                    <ShoppingCart cart={cart} updateCart={updateCart} />
                </Route>
                <Route exact path="/menu">
                    <Menu updateCart={updateCart} cart={cart} />
                </Route>
                <Route exact path="/profile">
                    <MyAccount cart={cart}/>
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
                <Route exact path="/success">
                    <Success cart={cart} />
                </Route>

                <Route exact path="/portal/customers">
                    <ManagementPortal portalComponent={CustomerAnalytics} />
                </Route>
                <Route exact path="/portal/ingredients">
                    <ManagementPortal portalComponent={ShoppingList} />
                </Route>
                <Route>
                    <NotFound />
                </Route>
            </Switch>
        </BrowserRouter>
    );
}
