import React from 'react';
import { Link } from 'react-router-dom';
import './LoginFirst.css';
import logo from "../../assets/CLIENT/Sweet B's Long.png";

/**
 * Login props
 */
interface LoginFirstProps {
    message?:string
}

/**
 * Displayed if the user checks out from the cart but didnt login
 * @returns the LoginFirst component
 */
export default function LoginFirst({message}:LoginFirstProps) {
    return (
        <div id="back-to-cart-error">
            <img src={logo} alt="Sweet B's" />
            <h1>{message ?? "You have to login first"}</h1>
            <p>Please go to the login page</p>
            <Link to="/login">
                <button className="btn filled warning">Login</button>
            </Link>
        </div>
    );
}
