import React, { Component } from 'react';
import './NotFound.css';

interface NotFoundProps {}

function NotFound() {
    return (
        <div id="not-found">
            <h3 id="not-found-text"> There's nothing here</h3>
            <img src="page_not_found.svg" id="not-found-img"></img>
        </div>
    );
}

export default NotFound;
