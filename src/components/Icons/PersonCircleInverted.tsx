import React from 'react';

export default function PersonCircleInverted(props: any) {
    return (
        <div className="icon person-circle-inverted">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 0 24 24"
                width="24"
            >
                <path d="M0 0h24v24H0z" fill="none"/>
                <path
                    fill={props.fill}
                    d="M12 5c-1.93 0-3.5 1.57-3.5 3.5S10.07 12 12 12s3.5-1.57 3.5-3.5S13.93 5 12 5zm0 9c-2.32 0-4.45.8-6.14 2.12C7.57 18.18 9.97 19 12 19c2.03 0 4.43-.82 6.14-2.88A9.948 9.948 0 0012 14z"
                />
            </svg>
        </div>
    );
}
