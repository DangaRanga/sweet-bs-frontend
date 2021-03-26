import { Spinner, WebsiteNav } from '../../components';
import { AppHooks, MenuHooks } from '../../hooks';
import { MenuItem } from '../../models';
import { ShoppingCartData } from '../../models/AppData';
import './Menu.css';
import MenuItemDisplay from './MenuItemDisplay/MenuItemDisplay';
import MenuItemSwitcher from './MenuItemSwitcher/MenuItemSwitcher';

interface MenuProps {
    updateCart: AppHooks.CartUpdater;
    cart: ShoppingCartData;
}

/**
 * The Menu View from which customer may add items to their cart
 */
export default function Menu(props: MenuProps) {
    /** All menu items in the database, grouped by category (Cookies or Cheesecake for example) */
    const categories = MenuHooks.useCategories();
    /** The index of the category and flavour selected by the user */
    const [selected, setSelected] = MenuHooks.useSelected();

    var menuitem!:MenuItem;
    if (categories.length > 0) {
        menuitem = categories[selected.category].menuitems[selected.flavour];

        if (!menuitem) {
            setSelected({ type: 'flavour', index: 0 });
        }
    }

    // display a spinner until the the menu items have been fetched then display the menu
    return categories.length > 0 ? (
        <div id="menu">
            <WebsiteNav cart={props.cart} />
            <div className="content">
                <MenuItemDisplay
                    selected={selected}
                    updateCart={props.updateCart}
                    updateSelected={setSelected}
                    category={categories[selected.category]}
                    menuitem={menuitem}
                />
                <MenuItemSwitcher
                    categories={categories}
                    selectedCategory={selected.category}
                    updateSelected={setSelected}
                />
            </div>
        </div>
    ) : (
        <div id="menu">
            <WebsiteNav cart={props.cart} />
            <Spinner />
        </div>
    );
}
