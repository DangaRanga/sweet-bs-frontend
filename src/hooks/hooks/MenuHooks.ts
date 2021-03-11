import { useEffect, useState, useReducer, Reducer } from 'react';
import { MenuItemCategory } from '../models';
import { fromJSON } from '../utils/JsonUtils';

namespace MenuHooks {
    /**
     * Fetch all menu items by category from the database
     */
    export function useCategories() {
        const [categories, setCategories] = useState<Array<MenuItemCategory>>(
            []
        );

        useEffect(() => {
            let isMounted = true;
            async function fetchMenuItems() {
                await fetch('http://0.0.0.0:9090/menuitems/category')
                    .then((res) => res.json())
                    .then((data) =>
                        data.map((v: any) => fromJSON<MenuItemCategory>(v))
                    )
                    .then((list) => {
                        if (isMounted) {
                            setCategories(list);
                        }
                    })
                    .catch((err) => []);
            }
            fetchMenuItems();

            return () => {
                isMounted = false;
            };
        }, []);

        return categories;
    }

    type SelectedUpdateAction =
        | { type: 'category'; index: number }
        | { type: 'flavour'; index: number };

    /** Used to update the Menu's selected state */
    export type SelectedUpdater = React.Dispatch<SelectedUpdateAction>;

    /** The selected state of flavours and categories in the Menu */
    interface SelectedState {
        /** The index of the selected category*/
        category: number;
        /** the index of the selected flavour*/
        flavour: number;
    }

    /**
     * Create the state for selected category and flavour in the menu.
     * @returns The selected state and corresponding setter
     */
    export function useSelected() {
        function reducer(
            selected: SelectedState,
            action: SelectedUpdateAction
        ) {
            const { type, index } = action;

            switch (type) {
                case 'category':
                    return { category: index, flavour: 0 };
                case 'flavour':
                    return { ...selected, flavour: index };
                default:
                    return selected;
            }
        }

        const [selected, updateSelected] = useReducer<
            Reducer<SelectedState, SelectedUpdateAction>
        >(reducer, {
            category: 0,
            flavour: 0,
        });

        return <const>[selected, updateSelected];
    }


    /**
     * Create and initialize the qty in the menu
     * @returns the qty state and corresponding updater
     */
    export function useQuantity() {
        type QtyDispatchAction = 'increment' | 'decrement';

        function reducer(qty: number, action: QtyDispatchAction) {
            switch (action) {
                case 'increment':
                    return qty + 1;
                case 'decrement':
                    return qty - 1 < 1 ? 1 : qty - 1;
                default:
                    return qty;
            }
        }

        const [qty, updateQty] = useReducer<Reducer<number, QtyDispatchAction>>(
            reducer,
            1
        );

        return <const>[qty, updateQty];
    }
}

export default MenuHooks;

