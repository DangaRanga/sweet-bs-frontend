import React from 'react';
import IconProps from './IconProps';
import './Icons.css';

export default function CheckCircle(props: IconProps) {
    return (
        <div className="icon check-circle">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                enable-background="new 0 0 24 24"
                height="24"
                viewBox="0 0 24 24"
                width="24"
            >
                <g>
                    <path d="M0,0h24v24H0V0z" fill="none" />
                </g>
                <g>
                    <path
                        fill={props.fill}
                        d="M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10c5.52,0,10-4.48,10-10S17.52,2,12,2z M16.95,10.23l-5.66,5.66 c-0.39,0.39-1.02,0.39-1.41,0l-2.83-2.83c-0.39-0.39-0.39-1.02,0-1.41c0.39-0.39,1.02-0.39,1.41,0l2.12,2.12l4.95-4.95 c0.39-0.39,1.02-0.39,1.41,0C17.34,9.21,17.34,9.84,16.95,10.23z"
                    />
                </g>
            </svg>
        </div>
    );
}
