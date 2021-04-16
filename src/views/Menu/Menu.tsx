import { Spinner, WebsiteNav } from '../../components';
import { MenuHooks } from '../../hooks';
import { MenuItem } from '../../models';
import './Menu.css';
import MenuItemDisplay from './MenuItemDisplay/MenuItemDisplay';
import MenuItemSwitcher from './MenuItemSwitcher/MenuItemSwitcher';
import { ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface MenuProps {}

/**
 * The Menu View from which customer may add items to their cart
 */
export default function Menu(props: MenuProps) {
    /** All menu items in the database, grouped by category (Cookies or Cheesecake for example) */
    const categories = MenuHooks.useCategories();
    /** The index of the category and flavour selected by the user */
    const [selected, setSelected] = MenuHooks.useSelected();

    var menuitem!: MenuItem;
    if (categories.length > 0) {
        menuitem = categories[selected.category].menuitems[selected.flavour];

        if (!menuitem) {
            setSelected({ type: 'flavour', index: 0 });
        }
    }

    // display a spinner until the the menu items have been fetched then display the menu
    return categories.length > 0 ? (
        <div id="menu">
            <WebsiteNav />
            <div className="content">
                <MenuItemDisplay
                    selected={selected}
                    updateSelected={setSelected}
                    category={categories[selected.category]}
                    menuitem={menuitem}
                />
                <MenuItemSwitcher
                    categories={categories}
                    selectedCategory={selected.category}
                    updateSelected={setSelected}
                />
                <ToastContainer
                    transition={Zoom}
                    position="bottom-right"
                    autoClose={5000}
                    hideProgressBar
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
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
