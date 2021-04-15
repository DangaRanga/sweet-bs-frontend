import React, { useState } from 'react';

interface paginationProps {
    usersPerPage: number;
    totalUsers: number;
    paginate(num: number): any;
}

export default function Pagination(props: paginationProps) {
    const pageNumber = [];
    const [current, setCurrent] = useState(1);

    for (
        let i = 1;
        i <= Math.ceil(props.totalUsers / props.usersPerPage);
        i++
    ) {
        pageNumber.push(i);
    }

    return (
        <div className="pagination-con">
            <ul className="pagination">
                {pageNumber.map((number) => (
                    <li key={number} className="page-item">
                        <a
                            onClick={() => {
                                props.paginate(number);
                                setCurrent(number);
                            }}
                            href="#"
                            className={`page-link ${
                                number === current ? 'active-page' : ''
                            }`}
                        >
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}
