import React, { Component } from 'react';
import {
    MenuItemDisplay,
    MenuItemSwitcher,
    Spinner,
    WebsiteNav
} from '../../components';
import { AppController, MenuController } from '../../controllers';
import { MenuItemCategory } from '../../models';
import './Menu.css';

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
 * The Menu View from which customer may add items to their cart
 */
export default class Menu extends Component<MenuProps, MenuState> {
    /** A Menu controller instance to act as the interface between the Model and database and the Menu View*/
    private _controller: MenuController;

    // initialize state
    readonly state: Readonly<MenuState> = {
        items: [],
        selectedCategory: 0,
        selectedFlavour: 0,
    };

    constructor(props: MenuProps) {
        super(props);
        // initialize the controller for the menu
        this._controller = new MenuController(this, this.props.appCtrl);
    }

    /**
     * Once the Menu View has been mounted, fetch the menu items from the database via the controller.
     */
    async componentDidMount() {
        await this._controller.fetchMenuItems();
    }

    render() {
        // display a spinner until the the menu items have been fetched then display the menu
        return this._controller.isMenuLoaded ? (
            <div id="menu">
                <WebsiteNav />
                <div className="content">
                    <MenuItemDisplay controller={this._controller} />
                    <MenuItemSwitcher controller={this._controller} />
                </div>
            </div>
        ) : (
            <div id="menu">
                <WebsiteNav />
                <Spinner />
            </div>
        );
    }
}
