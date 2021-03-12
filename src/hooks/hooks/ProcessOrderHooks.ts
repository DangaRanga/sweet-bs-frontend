import { Reducer, useEffect, useReducer, useState } from 'react';
import { Order } from '../models';
import { JWT, ShoppingCartData } from '../models/AppData';
import { toJSON } from '../utils/JsonUtils';

namespace ProcessOrderHooks {
    interface CardFormFields {
        card: string;
        cardNumber: string;
        nameOnCard: string;
        expiryMonth: string;
        expiryYear: string;
        expiryDate: string;
        cvv: string;
    }

    type CardFormUpdateActions =
        | { card: string }
        | { cardNumber: string }
        | { nameOnCard: string }
        | { expiryMonth: string }
        | { expiryYear: string }
        | { expiryDate: string }
        | { cvv: string };

    export function useFields() {
        var formFields: CardFormFields = {
            card: '',
            cardNumber: '',
            cvv: '',
            expiryDate: '',
            expiryMonth: '',
            expiryYear: '',
            nameOnCard: '',
        };

        function reducer(
            fields: CardFormFields,
            action: CardFormUpdateActions
        ) {
            return { ...fields, ...action };
        }

        const [fields, updateFields] = useReducer<
            Reducer<CardFormFields, CardFormUpdateActions>
        >(reducer, formFields);

        useEffect(() => {
            let isMounted = true;

            if (isMounted) {
                updateFields({
                    expiryDate: fields.expiryMonth + '/' + fields.expiryYear,
                });
            }
            return () => {
                isMounted = false;
            };
        }, [fields.expiryMonth, fields.expiryYear]);

        return <const>[fields, updateFields];
    }

    export function usePlaceOrder(
        cart: ShoppingCartData,
        jwt: JWT,
        fields: CardFormFields
    ) {
        const [canPlaceOrder, setCanPlaceOrder] = useState(false);
        const [shouldPlaceOrder, setShouldPlaceOrder] = useState(false);

        useEffect(() => {
            console.log('fired2');
            let isMounted = true;
            if (isMounted) {
                var list = Object.entries(fields) as [string, string][];
                var flag = list.every((value) => value[1].length > 0);

                setCanPlaceOrder(flag);
            }
            return () => {
                isMounted = false;
            };
        }, [fields]);

        useEffect(() => {
            let isMounted = true;

            if (isMounted) {
                if (shouldPlaceOrder) {
                    console.log('fired');
                    sendOrder(cart, jwt);
                }
            }
            return () => {
                isMounted = false;
            };
        }, [shouldPlaceOrder, cart, jwt]);

        return [canPlaceOrder, setShouldPlaceOrder] as const;
    }

    /**
     * Sends an order to the database for storage
     * @returns `true` if order was sent successfully and `false` otherwise
     */
    async function sendOrder(
        cart: ShoppingCartData,
        jwt: JWT
    ): Promise<boolean> {
        var success: boolean = false;
        // the new order to be sent
        var newOrder: Order = { complete: false, items: cart };

        const token = toJSON(jwt) ?? '';
        // After initialization, send the new order to the database
        success = await fetch('http://0.0.0.0:9090/orders/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Access-Token': token,
            },
            body: toJSON(newOrder),
        })
            .then((res) => res.status === 201)
            .catch((err) => {
                console.log(err);
                return false;
            });

        return success;
    }
}

export default ProcessOrderHooks;
