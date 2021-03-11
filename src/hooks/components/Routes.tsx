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
} from '../views';
import { AppController } from '../effects';
import { ShoppingCartData } from '../models/AppData';

interface RoutesProps {
    cart: ShoppingCartData
    setCart: AppController.UpdateCartAction
}


export default function Routes(props:RoutesProps) {
        return (
            <BrowserRouter forceRefresh={false}>
                <Switch>
                    <Route exact path="/cart">
                        <ShoppingCart
                            //appCtrl={this.props.appCtrl}
                        ></ShoppingCart>
                    </Route>
                    <Route exact path="/menu">
                        {/*<Menu/>*/}
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
