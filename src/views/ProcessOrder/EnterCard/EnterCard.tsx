import React from 'react';
import { Link } from 'react-router-dom';
import './EnterCard.css';
import cardImg from '../../../assets/images/undraw_Credit_card_re_blml 1.svg';
import visaImg from '../../../assets/icons/visa.svg';
import mastercardImg from '../../../assets/icons/mastercard.svg';
import { AppHooks, ProcessOrderHooks } from '../../../hooks';
import { JWT, ShoppingCartData } from '../../../models/AppData';

interface EnterCardProps {
    cart: ShoppingCartData;
    updateCart: AppHooks.CartUpdater;
    jwt: JWT;
}

export function restrictToNumbers(e:React.FormEvent<HTMLInputElement>) {
    console.log("hi");
    
    var value = e.currentTarget.value
    console.log(value);
    console.log(value.replace(/[^0-9]/g,''));
}

export default function EnterCard(props: EnterCardProps) {
    const [fields, updateFields] = ProcessOrderHooks.useFields();
    const [
        canPlaceOrder,
        setShouldPlaceOrder,
    ] = ProcessOrderHooks.usePlaceOrder(
        props.cart,
        props.jwt,
        fields,
        props.updateCart
    );

    return (
        <div id="enter-card">
            <div className="content">
                <form method="post">
                    <Link replace className="danger" to="/cart">
                        Cancel
                    </Link>
                    <h2>One more thing first!</h2>
                    <h1>Please Enter Your Card Info</h1>
                    <div id="select-card-type">
                        <label htmlFor="card-type">Card Type</label>
                        <label
                            htmlFor="visa-card-type"
                            className="radio-wrapper"
                        >
                            <input
                                type="radio"
                                name="card-type"
                                id="visa-card-type"
                                value="visa"
                                required
                                onChange={(e) =>
                                    e.currentTarget.checked
                                        ? updateFields({
                                              card: e.currentTarget.value,
                                          })
                                        : null
                                }
                            />
                            <img src={visaImg} alt="Visa" />
                        </label>
                        <label
                            htmlFor="master-card-type"
                            className="radio-wrapper"
                        >
                            <input
                                type="radio"
                                name="card-type"
                                id="master-card-type"
                                value="master-card"
                                required
                                onChange={(e) =>
                                    e.currentTarget.checked
                                        ? updateFields({
                                              card: e.currentTarget.value,
                                          })
                                        : null
                                }
                            />
                            <img src={mastercardImg} alt="Master Card" />
                        </label>
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
                        onInput={(e)=>restrictToNumbers(e)}
                        onChange={(e) =>
                            updateFields({
                                cardNumber: e.currentTarget.value,
                            })
                        }
                        value={fields.cardNumber}
                    />
                    <label htmlFor="name-on-card">Name On Card</label>
                    <input
                        type="text"
                        name="name-on-card"
                        placeholder="eg. John Doe"
                        required
                        onChange={(e) =>
                            updateFields({
                                nameOnCard: e.currentTarget.value,
                            })
                        }
                        value={fields.nameOnCard}
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
                                    value={fields.expiryMonth}
                                    onChange={(e) =>
                                        updateFields({
                                            expiryMonth: e.currentTarget.value,
                                        })
                                    }
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
                                    value={fields.expiryYear}
                                    onChange={(e) =>
                                        updateFields({
                                            expiryYear: e.currentTarget.value,
                                        })
                                    }
                                />
                            </div>
                            <input
                                type="hidden"
                                name="expiry-date"
                                value={fields.expiryDate}
                                readOnly
                            />
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
                                value={fields.cvv}
                                onChange={(e) =>
                                    updateFields({
                                        cvv: e.currentTarget.value,
                                    })
                                }
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        disabled={!canPlaceOrder}
                        className="btn success filled"
                        onClick={(e) => {
                            e.preventDefault();
                            setShouldPlaceOrder(true);
                        }}
                    >
                        Place Order
                    </button>
                </form>
                <img src={cardImg} alt="Card" />
            </div>
        </div>
    );
}
