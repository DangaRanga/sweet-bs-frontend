import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import BackToCart from './BackToCart/BackToCart';
import EnterCard from './EnterCard/EnterCard';
import './ProcessOrder.css';

interface ProcessOrderProps
    extends Partial<RouteComponentProps<any, any, { fromCart: boolean }>> {}

export default function ProcessOrder(props: ProcessOrderProps) {
    const hadCheckedOut = props.location?.state?.fromCart ?? false;

    return (
        <div id="process-order">
            {hadCheckedOut && <EnterCard />}
            {!hadCheckedOut && <BackToCart />}
        </div>
    );
}
