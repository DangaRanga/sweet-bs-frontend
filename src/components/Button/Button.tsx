// React imports
import React, { Component } from 'react';

// CSS imports
import './Button.css';

// Define CSS classes for button styles and sizes
const STYLES: string[] = [
    'btn--primary--solid',
    'btn--secondary--solid',
    'btn--success--solid',
    'btn--primary--outline',
    'btn--secondary--outline',
];

const SIZES: string[] = [];

const TYPES: string[] = ['button', 'submit', 'reset'];

// Define Component props
interface ButtonProps {
    text: string;
    type: any;
    onClick: any;
    style: string;
    size: string;
}

function Button({ text, type, onClick, style, size }: ButtonProps) {
    // Assign default value if the respective values for the size, style and type are unset
    const buttonStyle = STYLES.includes(style) ? style : STYLES[0];
    const buttonSize = SIZES.includes(size) ? size : SIZES[0];
    const buttonType = TYPES.includes(type) ? type : TYPES[0];
    return (
        <button
            className={`btn ${buttonStyle} ${buttonSize}`}
            type={buttonType}
            onClick={onClick}
        >
            {text}
        </button>
    );
}

export default Button;
