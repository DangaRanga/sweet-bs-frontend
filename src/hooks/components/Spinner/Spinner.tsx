import React, { Component } from 'react';
import './Spinner.css';

interface SpinnerProps {}

interface SpinnerState {}

export default class Spinner extends Component<SpinnerProps, SpinnerState> {
    render() {
        return (
            <div className="spinner">
                <div className="spinner-rings"></div>
            </div>
        );
    }
}
