import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { AppController, ProcessOrderController } from '../../effects';
import BackToCart from './BackToCart/BackToCart';
import EnterCard from './EnterCard/EnterCard';
import './ProcessOrder.css';


interface ProcessOrderProps extends Partial<RouteComponentProps<any, any, {fromCart:boolean}>>{
        appCtrl: AppController;
    }
interface ProcessOrderState {}

export default class ProcessOrder extends Component<
    ProcessOrderProps,
    ProcessOrderState
> {

    private _hadCheckedOut:boolean;
    private _controller:ProcessOrderController;

    constructor(props: ProcessOrderProps) {
        super(props);
        this._hadCheckedOut = this.props.location?.state?.fromCart ?? false;
        this._controller = new ProcessOrderController(this, this.props.appCtrl);
    }

    render() {
        return <div id="process-order">
            {this._hadCheckedOut && <EnterCard controller={this._controller}/>} 
            {!this._hadCheckedOut && <BackToCart/>}
        </div>;
    }
}
