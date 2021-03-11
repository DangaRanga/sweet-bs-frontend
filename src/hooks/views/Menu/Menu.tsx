import { Spinner, WebsiteNav } from '../../components';
import { AppHooks,MenuHooks } from '../../hooks';

import './Menu.css';
import MenuItemDisplay from './MenuItemDisplay/MenuItemDisplay';
import MenuItemSwitcher from './MenuItemSwitcher/MenuItemSwitcher';

interface MenuProps{
    updateCart:AppHooks.CartUpdater
}

/**
 * The Menu View from which customer may add items to their cart
 */
export default function Menu(props: MenuProps) {
    /** All menu items in the database, grouped by category (Cookies or Cheesecake for example) */
    const categories = MenuHooks.useCategories();
    /** The index of the category and flavour selected by the user */
    const [selected, setSelected] = MenuHooks.useSelected();

    // display a spinner until the the menu items have been fetched then display the menu
    return categories.length > 0 ? (
        <div id="menu">
            <WebsiteNav />
            <div className="content">
                <MenuItemDisplay
                updateCart={props.updateCart}
                    updateSelected={setSelected}
                    category={categories[selected.category]}
                    menuitem={
                        categories[selected.category].menuitems[selected.flavour]
                    }
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
            <WebsiteNav />
            <Spinner />
        </div>
    );
}
