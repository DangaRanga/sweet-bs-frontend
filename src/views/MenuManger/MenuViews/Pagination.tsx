import React from 'react';

interface paginationProps {
    itemsPerPage: number;
    totalItems: number;
    paginate(num: number): any;
}

export default function Pagination(props: paginationProps) {
    const pageNumber = [];

    for (
        let i = 1;
        i <= Math.ceil(props.totalItems / props.itemsPerPage);
        i++
    ) {
        pageNumber.push(i);
    }

    return (
        <nav>
            <ul className="pagination">
                {pageNumber.map((number) => (
                    <li key={number} className="page-item">
                        <a
                            onClick={() => props.paginate(number)}
                            href="#"
                            className="page-link"
                        >
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
