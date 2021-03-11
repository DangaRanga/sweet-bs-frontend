import {
    Switch,
    Route,
    BrowserRouter,
} from 'react-router-dom';
import {
    MyAccount,
    NotFound,
} from '../views';
import { AppHooks } from '../hooks';
import { ShoppingCartData } from '../models/AppData';

interface RoutesProps {
    cart: ShoppingCartData
    setCart: AppHooks.UpdateCartAction
}


export default function Routes(props:RoutesProps) {
        return (
            <BrowserRouter forceRefresh={false}>
                <Switch>
                    <Route exact path="/cart">
                        {/*<ShoppingCart/>*/}
                    </Route>
                    <Route exact path="/menu">
                        {/*<Menu/>*/}
                    </Route>
                    <Route exact path="/profile">
                        <MyAccount />
                    </Route>
                    {/* <Route
                        exact
                        path="/processorder"
                        render={(props: RouteComponentProps<any, any, any>) => (
                            <ProcessOrder
                                //appCtrl={this.props.appCtrl}
                                history={props.history}
                                location={props.location}
                                match={props.match}
                                staticContext={props.staticContext}
                            />
                        )}
                    ></Route> */}

                    <Route>
                        <NotFound />
                    </Route>
                </Switch>
            </BrowserRouter>
        );
    
}
