import React, { Component } from 'react';
import { MenuController } from '../../controllers';
import './MenuItemSwitcher.css';
import placeholder from '../../assets/cart_placeholder.png';

interface MenuItemSwitcherProps {
    controller: MenuController;
}

interface MenuItemSwitcherState {}

export default class MenuItemSwitcher extends Component<
    MenuItemSwitcherProps,
    MenuItemSwitcherState
> {
    render() {
        const categories = this.props.controller.categories.map((cat, i) => (
            <button
                key={cat.id}
                onClick={(e) => this.props.controller.switchSelectedCategory(i)}
                className={`btn icon category ${i===this.props.controller.selectedCategoryIndex? "selected" : ""}`}
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
