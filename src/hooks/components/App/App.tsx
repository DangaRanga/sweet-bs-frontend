import React from 'react';
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
} from '../../views';
import { AppHooks } from '../../hooks';
import './App.css';

export default function App() {
    const [cart, updateCart] = AppHooks.useCart();

    return (
        <BrowserRouter forceRefresh={false}>
            <Switch>
                <Route exact path="/cart">
                    <ShoppingCart
                    cart={cart}
                    updateCart={updateCart}
                    />
                </Route>
                <Route exact path="/menu">
                    <Menu updateCart={updateCart}/>
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
                            updateCart={updateCart}
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
