import React, {useContext} from 'react';
import { useLocation } from 'react-router-dom';
import { AppContext } from '../../context';
import BackToCart from './BackToCart/BackToCart';
import EnterCard from './EnterCard/EnterCard';
import LoginFirst from "../../components/LoginFirst/LoginFirst";
import './ProcessOrder.css';

export default function ProcessOrder() {
    // check if the user checked out from cart
    const loc = useLocation<{ fromCart?: boolean }>();
    const hadCheckedOut = loc.state?.fromCart ?? false;
    const context = useContext(AppContext);


    return (
        <div id="process-order">
            {context.jwt.token ? hadCheckedOut ? <EnterCard /> : <BackToCart /> : <LoginFirst/>}
        </div>
    );
}
