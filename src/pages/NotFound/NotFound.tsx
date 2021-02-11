import React, { Component } from 'react';
import './NotFound.css';

interface NotFoundProps {}

interface NotFoundState {}

export default class NotFound extends Component<NotFoundProps, NotFoundState> {
    render() {
        return (
            <div>
                <h1>404</h1>
            </div>
        );
    }
}
