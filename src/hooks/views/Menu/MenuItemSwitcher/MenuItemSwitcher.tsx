import React, { Component } from 'react';
import { MenuController } from '../../controllers';
import './MenuItemSwitcher.css';
import placeholder from '../../assets/cart_placeholder.png';

interface MenuItemCategorySwitcherProps {
    controller: MenuController;
}

interface MenuItemCategorySwitcherState {}

/**
 * Allows for the selected menu item category to be switched by the user
 */
export default class MenuItemCategorySwitcher extends Component<
    MenuItemCategorySwitcherProps,
    MenuItemCategorySwitcherState
> {
    render() {
        // build list of category buttons and register an onclick handler to switch the category
        const categories = this.props.controller.categories.map((cat, i) => (
            <button
                key={cat.id}
                onClick={(e) => this.props.controller.switchSelectedCategory(i)}
                className={`btn icon category ${
                    i === this.props.controller.selectedCategoryIndex
                        ? 'selected'
                        : ''
                }`}
            >
                <img
                    src={placeholder}
                    //src={cat.menuitems[0].imgUrl}
                    alt={this.props.controller.categories[i].name}
                />
            </button>
        ));
        return <div id="menuitem-switcher">{categories}</div>;
    }
}
