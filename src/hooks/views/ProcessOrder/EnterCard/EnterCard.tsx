import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './EnterCard.css';
import cardImg from '../../../../assets/images/undraw_Credit_card_re_blml 1.svg';
import { ProcessOrderController } from '../../../effects';

interface EnterCardProps {
    controller: ProcessOrderController;
}

interface EnterCardState {}

export default class EnterCard extends Component<
    EnterCardProps,
    EnterCardState
> {
    render() {
        return (
            <div id="enter-card">
                <div className="content">
                    <form action="" method="post">
                        <Link replace className="danger" to="/cart">
                            Cancel
                        </Link>
                        <h2>One more thing first!</h2>
                        <h1>Please Enter Your Card Info</h1>
                        <div id="select-card-type">
                            <label htmlFor="card-type">Card Type</label>
                            <input
                                type="radio"
                                name="card-type"
                                id="visa-card-type"
                                value="visa"
                                required
                            />
                            <input
                                type="radio"
                                name="card-type"
                                id="master-card-type"
                                value="master-card"
                                required
                            />
                        </div>
                        <label htmlFor="card-number">Card Number</label>
                        <input
                            type="tel"
                            name="card-number"
                            id="card-number"
                            placeholder="#### #### #### ####"
                            inputMode="numeric"
                            maxLength={19}
                            minLength={17}
                            required
                        />

                        <label htmlFor="name-on-card">Name On Card</label>
                        <input
                            type="text"
                            placeholder="eg. John Doe"
                            required
                        />
                        <div id="date-and-cvv">
                            <div id="select-date">
                                <label htmlFor="expiry-date">Expiry Date</label>
                                <div id="month-year">
                                    <input
                                        type="tel"
                                        name="expiry-month"
                                        id="expiry-month"
                                        placeholder="MM"
                                        maxLength={2}
                                        minLength={2}
                                        inputMode="numeric"
                                        required
                                    />
                                    <input
                                        type="tel"
                                        name="expiry-year"
                                        id="expiry-year"
                                        placeholder="YYYY"
                                        maxLength={4}
                                        minLength={4}
                                        inputMode="numeric"
                                        required
                                    />
                                </div>
                                <input type="hidden" name="expiry-date" />
                            </div>
                            <div id="select-cvv">
                                <label htmlFor="cvv">CVV</label>
                                <input
                                    type="tel"
                                    name="cvv"
                                    id="cvv"
                                    placeholder="###"
                                    maxLength={3}
                                    minLength={3}
                                    inputMode="numeric"
                                    required
                                />
                            </div>
                        </div>
                        <button type="submit" className="btn success filled">
                            Place Order
                        </button>
                    </form>
                    <img src={cardImg} alt="Card" />
                </div>
            </div>
        );
    }
}
