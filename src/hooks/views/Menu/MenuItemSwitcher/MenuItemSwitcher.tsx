import './MenuItemSwitcher.css';
import placeholder from '../../../../assets/cart_placeholder.png';
import { MenuItemCategory } from '../../../models';
import { MenuHooks} from '../../../hooks';

interface MenuItemCategorySwitcherProps {
    categories: MenuItemCategory[];
    selectedCategory: number;
    updateSelected: MenuHooks.SelectedUpdater;
}

/**
 * Allows for the selected menu item category to be switched by the user
 */
export default function MenuItemCategorySwitcher(
    props: MenuItemCategorySwitcherProps
) {
    // build list of category buttons and register an onclick handler to switch the category
    const categories = props.categories.map((cat, i) => (
        <button
            key={cat.id}
            onClick={(e) => props.updateSelected({ type: 'category', index: i })}
            className={`btn icon category ${
                i === props.selectedCategory ? 'selected' : ''
            }`}
        >
            <img
                src={placeholder}
                //src={cat.menuitems[0].imgUrl}
                alt={cat.name}
            />
        </button>
    ));
    return <div id="menuitem-switcher">{categories}</div>;
}
