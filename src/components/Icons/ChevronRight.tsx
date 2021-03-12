import React from 'react';
import IconProps from './IconProps';
import './Icons.css';

export default function ChevronRight(props: IconProps) {
    return (
        <div className="icon chevron-right">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 0 24 24"
                width="24"
            >
                <path d="M0 0h24v24H0z" fill="none" />
                <path
                    fill={props.fill}
                    d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"
                />
            </svg>
        </div>
    );
}
