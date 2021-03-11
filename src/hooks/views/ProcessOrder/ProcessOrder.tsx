import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { AppHooks } from '../../hooks';
import { ShoppingCartData } from '../../models/AppData';
import BackToCart from './BackToCart/BackToCart';
import EnterCard from './EnterCard/EnterCard';
import './ProcessOrder.css';


interface ProcessOrderProps extends Partial<RouteComponentProps<any, any, {fromCart:boolean}>>{
    updateCart: AppHooks.CartUpdater
    cart: ShoppingCartData
    }

export default function ProcessOrder (props:ProcessOrderProps)
 {

    
        const hadCheckedOut = props.location?.state?.fromCart ?? false;

        return <div id="process-order">
            {hadCheckedOut && <EnterCard cart={props.cart} updateCart={props.updateCart}/>} 
            {!hadCheckedOut && <BackToCart/>}
        </div>;
}
