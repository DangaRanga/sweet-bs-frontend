import { useEffect, useState, Component, useReducer, Reducer } from 'react';
import { MenuItem, MenuItemCategory } from '../models';
import { AppController } from '.';
import ViewController from './ViewController';
import { fromJSON } from '../utils/JsonUtils';

/**
 * Fetch all menu items by category from the database
 */
export function useMenuCategories() {
    const [categories, setCategories] = useState<Array<MenuItemCategory>>([]);

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

type SelectedDispatchAction =
    | { type: 'category'; index: number }
    | { type: 'flavour'; index: number };

/** Used to update the Menu's selected state */
export type SelectedDispatch = React.Dispatch<SelectedDispatchAction>;

/** The selected state in the Menu */
interface SelectedFromMenuState {
    /** The index of the selected category*/
    category: number;
    /** the index of the selected flavour*/
    flavour: number;
}

/**
 * Create the state for selected category and flavour in the menu.
 * @returns The selected state and corresponding setter
 */
export function useSelectedFromMenu() {
    function reducer(
        selected: SelectedFromMenuState,
        action: SelectedDispatchAction
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

    const [selected, setSelected] = useReducer<
        Reducer<SelectedFromMenuState, SelectedDispatchAction>
    >(reducer, {
        category: 0,
        flavour: 0,
    });

    return <const>[selected, setSelected];
}

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

    const [qty, setQty] = useReducer<Reducer<number, QtyDispatchAction>>(
        reducer,
        1
    );

    return <const>[qty, setQty];
}

export function useAddToCart(item: MenuItem, qty: number) {
    const [shouldAddToCart, setShouldAddToCart] = useState(false);

    useEffect(() => {
        if (shouldAddToCart) {
            //TODO add stuff to cart
            setShouldAddToCart(false);
        }
    }, [shouldAddToCart, item, qty]);

    return setShouldAddToCart;
}

/**
 * props for the Menu View
 */
interface MenuProps {
    /** The global app controller */
    appCtrl: AppController;
}

/**
 * The Menu View state
 */
interface MenuState {
    /** All menu items in the database, grouped by category (Cookies or Cheesecake for example) */
    items: MenuItemCategory[];
    /** The index of the category currently selected by the user for viewing */
    selectedCategory: number;
    /** The index of the flavour in the selected category selected by the user */
    selectedFlavour: number;
}

/**
 * Controller for the Menu View
 */
export default class MenuController<
    T extends Component<MenuProps, MenuState>
> extends ViewController {
    private _menuView: T;

    /**
     *
     * @param menu The Menu
     * @param app The App controller
     */
    constructor(menu: T, app: AppController) {
        super(app);
        this._menuView = menu;
    }

    /**
     * Increase the quantity of the selected item by1
     */
    public incrementMenuQty(): void {
        const qty = document.getElementById('qty') as HTMLInputElement;
        qty.valueAsNumber += 1;
    }

    /**
     * Decrease the quantity of the selected item by 1
     */
    public decrementMenuQty(): void {
        const qty = document.getElementById('qty') as HTMLInputElement;
        if (qty.valueAsNumber > 1) {
            qty.valueAsNumber -= 1;
        }
    }

    /**
     * Adds the menuitem to cart with the specified quantity.
     * Animates the add to cart button to indicate to the user that the item has been added.
     * @param menuitem the menu item to be added
     * @param qty the quantity of the menu item to be added
     */
    public addToCart(): void {
        const qty = document.getElementById('qty') as HTMLInputElement;
        // add item to cart
        /* this.appCtrl.addItemToCart(
            this.selectedFlavour as MenuItem,
            qty.valueAsNumber
        ); */

        // animate button
        const btn = document.getElementById('add-to-cart-btn')!;
        var children = btn.children;
        var text: HTMLParagraphElement = children[1] as HTMLParagraphElement;
        var icon = children[0] as SVGElement;
        var text2 = document.getElementById('extra')!;
        var text3 = document.getElementById('extra-inner')!;

        text2.style.right = '-5px';
        text3.style.opacity = '1';
        text3.style.right = '0';
        icon.style.opacity = '1';
        icon.style.left = '0';
        text.style.right = '0';
        btn.style.backgroundColor = '#3ABC41';
        setTimeout((_) => {
            text2.removeAttribute('style');
            text.removeAttribute('style');
            btn.removeAttribute('style');
            text3.removeAttribute('style');
            icon.removeAttribute('style');
        }, 2000);
    }
}
