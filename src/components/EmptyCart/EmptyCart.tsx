import React, { Component } from "react";
import "./EmptyCart.css";


interface EmptyCartProps {
}

interface EmptyCartState {
}

export default class EmptyCart extends Component<EmptyCartProps,EmptyCartState> {
    render() {
        return (
            <div>
                Empty
            </div>
        );
    }
}