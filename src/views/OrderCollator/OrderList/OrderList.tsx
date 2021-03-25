import React from 'react';

import './OrderList.css';

interface OrderListProps {}

function OrderList(props: OrderListProps) {
    return (
        <div id="order-collator-list">
            <h3>Order List</h3>
            <hr className="collator-list-divider" />
            <div id="order-list-header">
                <ul>
                    <li> Order ID </li>
                    <li> Order Status </li>
                    <li> Customer Name </li>
                    <li> Customer Location </li>
                    <li> Order Total </li>
                    <li> Order Date </li>
                    <li> View Order </li>
                </ul>
                <hr className="collator-list-divider" />
            </div>
            <div className="order-list-row">
                <ul>
                    <li> XXX-XXX-XXX </li>
                    <li> Done </li>
                    <li> John Smith </li>
                    <li> Kingston </li>
                    <li> $500 </li>
                    <li> Feb-05-2021 </li>
                    <button className="collator-btn"> View </button>
                </ul>
                <hr className="collator-list-divider" />
            </div>
            <div className="order-list-row">
                <ul>
                    <li> XXX-XXX-XXX </li>
                    <li> Done </li>
                    <li> John Smith </li>
                    <li> Kingston </li>
                    <li> $500 </li>
                    <li> Feb-05-2021 </li>
                    <button className="collator-btn"> View </button>
                </ul>
                <hr className="collator-list-divider" />
            </div>
            <div className="order-list-row">
                <ul>
                    <li> XXX-XXX-XXX </li>
                    <li> Done </li>
                    <li> John Smith </li>
                    <li> Kingston </li>
                    <li> $500 </li>
                    <li> Feb-05-2021 </li>
                    <button className="collator-btn"> View </button>
                </ul>
                <hr className="collator-list-divider" />
            </div>
        </div>
    );
}

export default OrderList;
