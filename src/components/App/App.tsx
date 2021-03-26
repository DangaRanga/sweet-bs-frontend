import React, { useEffect } from 'react';
import {
    Switch,
    Route,
    BrowserRouter,
    RouteComponentProps,
} from 'react-router-dom';
import {
    Menu,
    MyAccount,
    NotFound,
    ProcessOrder,
    ShoppingCart,
    CustomerAnalytics,
    ShoppingList,
} from '../../views';
import { AppHooks } from '../../hooks';
import './App.css';
import ManagementPortal from '../../views/ManagementPortal/ManagementPortal';
import OrderCollator from '../OrderCollator/OrderCollator';

export default function App() {
    const [cart, updateCart] = AppHooks.useCart();
    const [jwt, updateJWT] = AppHooks.useJWT();

    /* updateJWT({
        type: 'login',
        username: 'ARich123',
        password: 't#st123',
    }); */

    console.log(jwt);

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
                            //appCtrl={this.props.appCtrl}
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
                <Route exact path="/portal/customers">
                    <ManagementPortal portalComponent={CustomerAnalytics} />
                </Route>
                <Route exact path="/portal/ingredients">
                    <ManagementPortal portalComponent={ShoppingList} />
                </Route>
                <Route exact path="/portal/orders">
                    <ManagementPortal portalComponent={OrderCollator} />
                </Route>
                <Route></Route>
                <Route>
                    <NotFound />
                </Route>
            </Switch>
        </BrowserRouter>
    );
}
