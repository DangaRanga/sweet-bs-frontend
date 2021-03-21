import React from 'react';
import { Link } from 'react-router-dom';
import successImg from '../../../assets/images/High_five 1.svg';
import { WebsiteNav } from '../../../components';
import './Success.css';

interface SuccessProps {}

export function Success(props: SuccessProps) {
    return (
        <div id="success">
            <WebsiteNav />
            <div className="content">
                <img src={successImg} alt="Order placed successfully" />
                <h1>We got your order!</h1>
                <p>It will be delivered to you over the weekend</p>
                <Link to="/home" className="primary btn filled">HOME</Link>
            </div>
        </div>
    );
}
