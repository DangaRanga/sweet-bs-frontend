import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { WebsiteNav } from '../../components';
import MenuItemDisplay from '../../components/MenuItemDisplay/MenuItemDisplay';
import MenuItemSwitcher from '../../components/MenuItemSwitcher/MenuItemSwitcher';
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
        return this.state.items.length > 0 ? (
            <div id="menu">
                <WebsiteNav />
                <MenuItemDisplay controller={this._controller} />
                <MenuItemSwitcher controller={this._controller} />
            </div>
        ) : (
            <div id="menu">
                <WebsiteNav />
            </div>
        );
    }
}
