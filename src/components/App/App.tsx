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
import { Success } from '../../views/ProcessOrder/Success/Success';

export default function App() {
    const [cart, updateCart] = AppHooks.useCart();
    const [jwt, updateJWT] = AppHooks.useJWT();

    console.log(jwt);

    return (
        <BrowserRouter forceRefresh={false}>
            <Switch>
                <Route exact path="/cart">
                    <ShoppingCart cart={cart} updateCart={updateCart} />
                </Route>
                <Route exact path="/menu">
                    <Menu updateCart={updateCart} cart={cart}/>
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
                <Route
                    exact
                    path='/success'
                >
                    <Success cart={cart}/>
                </Route>

                <Route exact path="/customers">
                    <CustomerAnalytics />
                </Route>
                <Route exact path="/ingredients">
                    <ShoppingList />
                </Route>
                <Route>
                    <NotFound />
                </Route>
            </Switch>
        </BrowserRouter>
    );
}
