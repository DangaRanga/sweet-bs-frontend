import React from 'react';
import { Link } from 'react-router-dom';
import './EnterCard.css';
import cardImg from '../../../../assets/images/undraw_Credit_card_re_blml 1.svg';
import { AppHooks, ProcessOrderHooks } from '../../../hooks';
import { JWT, ShoppingCartData } from '../../../models/AppData';

interface EnterCardProps {
    cart: ShoppingCartData;
    updateCart: AppHooks.CartUpdater;
    jwt: JWT;
}

export default function EnterCard(props: EnterCardProps) {
    const [fields, updateFields] = ProcessOrderHooks.useFields();
    const [
        canPlaceOrder,
        setShouldPlaceOrder,
    ] = ProcessOrderHooks.usePlaceOrder(props.cart, props.jwt, fields);

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
                            onChange={(e) =>
                                e.currentTarget.checked
                                    ? updateFields({
                                          card: e.currentTarget.value,
                                      })
                                    : null
                            }
                        />
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
                        onChange={(e) =>
                            e.currentTarget.checked
                                ? updateFields({
                                      cardNumber: e.currentTarget.value,
                                  })
                                : null
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
                            e.currentTarget.checked
                                ? updateFields({
                                      nameOnCard: e.currentTarget.value,
                                  })
                                : null
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
                                        e.currentTarget.checked
                                            ? updateFields({
                                                  expiryMonth:
                                                      e.currentTarget.value,
                                              })
                                            : null
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
                                        e.currentTarget.checked
                                            ? updateFields({
                                                  expiryYear:
                                                      e.currentTarget.value,
                                              })
                                            : null
                                    }
                                />
                            </div>
                            <input
                                type="hidden"
                                name="expiry-date"
                                value={fields.expiryDate}
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
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        disabled={!canPlaceOrder}
                        className="btn success filled"
                        onClick={(e) => setShouldPlaceOrder(true)}
                    >
                        Place Order
                    </button>
                </form>
                <img src={cardImg} alt="Card" />
            </div>
        </div>
    );
}
