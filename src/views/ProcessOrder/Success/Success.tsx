import React from 'react';
import { Link } from 'react-router-dom';
import successImg from '../../../assets/images/High_five 1.svg';
import { WebsiteNav } from '../../../components';
import './Success.css';

/**
 * Reports that an order was successfully placed
 * @returns The success component
 */
export function Success() {
    return (
        <div id="success">
            <WebsiteNav />
            <div className="content">
                <img src={successImg} alt="Order placed successfully" />
                <h1 className="success">We got your order!</h1>
                <p>It will be delivered to you over the weekend</p>
                {/* // TODO if home is implemented then change link */}
                <Link to="/menu" className="primary btn filled">MENU</Link>
            </div>
        </div>
    );
}
