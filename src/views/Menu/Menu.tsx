import React, { Component } from 'react';
import {
    MenuItemDisplay,
    MenuItemSwitcher,
    Spinner,
    WebsiteNav,
} from '../../components';
import { AppController, MenuController } from '../../controllers';
import { MenuItemCategory } from '../../models';
import './Menu.css';

interface MenuProps {
    appCtrl: AppController;
}

interface MenuState {
    items: MenuItemCategory[];
    selectedCategory: number;
    selectedFlavour: number;
}

export default class Menu extends Component<MenuProps, MenuState> {
    private _controller: MenuController;

    readonly state: Readonly<MenuState> = {
        items: [],
        selectedCategory: 0,
        selectedFlavour: 0,
    };

    constructor(props: MenuProps) {
        super(props);
        this._controller = new MenuController(this, this.props.appCtrl);
    }

    async componentDidMount() {
        await this._controller.fetchMenuItems();
    }

    render() {
        return this._controller.isCartLoaded ? (
            <div id="menu">
                <WebsiteNav />
                <div className="content">
                <MenuItemDisplay controller={this._controller} />
                <MenuItemSwitcher controller={this._controller} /></div>
            </div>
        ) : (
            <div id="menu">
                <WebsiteNav />
                <Spinner />
            </div>
        );
    }
}
