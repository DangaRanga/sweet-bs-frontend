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
     * Updates the selected state based on the actions passed
     */
    function selectedReducer(
        selected: SelectedState,
        action: SelectedUpdateAction
    ): SelectedState {
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

    /**
     * Create the state for selected category and flavour in the menu.
     * @returns The selected state and corresponding setter
     */
    export function useSelected() {
        const [selected, updateSelected] = useReducer<
            Reducer<SelectedState, SelectedUpdateAction>
        >(selectedReducer, {
            category: 0,
            flavour: 0,
        });

        return <const>[selected, updateSelected];
    }

    /** The actions that may be taken when changing the quantity */
    type QtyDispatchAction = 'increment' | 'decrement';

    /**
     * Updates the quantity based on the action passed
     */
    function quantityReducer(qty: number, action: QtyDispatchAction): number {
        switch (action) {
            case 'increment':
                return qty + 1;
            case 'decrement':
                return qty - 1 < 1 ? 1 : qty - 1;
            default:
                return qty;
        }
    }

    /**
     * Create and initialize the qty in the menu
     * @returns the qty state and corresponding updater
     */
    export function useQuantity() {
        const [qty, updateQty] = useReducer<Reducer<number, QtyDispatchAction>>(
            quantityReducer,
            1
        );

        return <const>[qty, updateQty];
    }
}

export default MenuHooks;
