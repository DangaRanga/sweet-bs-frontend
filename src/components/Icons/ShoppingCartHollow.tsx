import React from 'react';
import IconProps from './IconProps';
import "./Icons.css";

export default function ShoppingCartHollow(props:IconProps) {
    return (
        <div className="icon shopping-cart-hollow">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 0 24 24"
                width="24"
            >
                <path fill="none" d="M0 0h24v24H0z" />
                <path
                    fill={props.fill}
                    d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2zm-8.9-5h7.45c.75 0 1.41-.41 1.75-1.03l3.24-6.14a.998.998 0 00-.4-1.34.996.996 0 00-1.36.41L15.55 11H8.53L4.27 2H2c-.55 0-1 .45-1 1s.45 1 1 1h1l3.6 7.59-1.35 2.44C4.52 15.37 5.48 17 7 17h11c.55 0 1-.45 1-1s-.45-1-1-1H7z"
                />
            </svg>
        </div>
    );
}
