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
    SignUp,
    UserOrders,
} from '../../views';

// Component Imports
import { OrderCollator, Dashboard } from '..';

import { AppHooks } from '../../hooks';
import './App.css';
import { Success } from '../../views/ProcessOrder/Success/Success';
import { AppContext } from '../../context';

export default function App() {
    const [jwt, updateJWT] = AppHooks.useJWT();

    const [cart, updateCart] = AppHooks.useCart();

    /* updateJWT({
        type: 'login',
        username: 'ARich123',
        password: 't#st123',
    });   */

    //console.log(jwt);

    return (
        <AppContext.Provider
            value={{
                jwt: jwt,
                updateJWT: updateJWT,
                cart: cart,
                updateCart: updateCart,
            }}
        >
            <BrowserRouter forceRefresh={false}>
                <Switch>
                    <Route exact path="/cart">
                        <ShoppingCart />
                    </Route>
                    <Route exact path="/menu">
                        <Menu />
                    </Route>
                    <Route exact path="/profile">
                        <MyAccount />
                    </Route>
                    <Route exact path="/processorder">
                        <ProcessOrder />
                    </Route>
                    <Route exact path="/signup">
                        <SignUp></SignUp>
                    </Route>
                    <Route exact path="/portal/">
                        <ManagementPortal portalComponent={Dashboard} />
                    </Route>
                    <Route exact path="/portal/orders">
                        <ManagementPortal portalComponent={OrderCollator} />
                    </Route>
                    <Route exact path="/success">
                        <Success />
                    </Route>

                    <Route exact path="/portal/customers">
                        <ManagementPortal portalComponent={CustomerAnalytics} />
                    </Route>
                    <Route exact path="/portal/customers/:id">
                        <ManagementPortal portalComponent={UserOrders} />
                    </Route>
                    <Route exact path="/portal/ingredients">
                        <ManagementPortal portalComponent={ShoppingList} />
                    </Route>
                    <Route>
                        <NotFound />
                    </Route>
                </Switch>
            </BrowserRouter>
        </AppContext.Provider>
    );
}
