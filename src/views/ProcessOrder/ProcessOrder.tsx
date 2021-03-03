import React, { Component } from "react";
import {  RouteProps } from "react-router-dom";
import { ShoppingCartController } from "../../controllers";
import "./ProcessOrder.css";


interface ProcessOrderProps extends RouteProps {
    //location: Location<ShoppingCartController> | undefined;
}

interface ProcessOrderState {
}

export default class ProcessOrder extends Component<ProcessOrderProps,ProcessOrderState> {
    private _controller: ShoppingCartController;

    constructor(props:ProcessOrderProps){
        super(props);
        this._controller = this.props.location?.state as ShoppingCartController;
    }

    render() {
        return (
            <div id="process-order">
                
            </div>
        );
    }
}