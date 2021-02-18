import { Component } from 'react';
import { MenuController } from '../../controllers';
import { MenuItem } from '../../models';
import './MenuItemDisplay.css';

interface MenuItemDisplayProps {
    controller: MenuController;
}

interface MenuItemDisplayState {}

export default class MenuItemDisplay extends Component<
    MenuItemDisplayProps,
    MenuItemDisplayState
> {
    render() {
        const flavours = this.controller.selectedCategory.menuitems.map(
            (item, i) =>
                item.id === this.controller.selectedFlavour?.id ? (
                    <button
                        key={item.id}
                        onClick={() => {
                            this.controller.switchSelectedFlavour(i);
                        }}
                        className="btn flavour selected"
                    >
                        {item.flavour}
                    </button>
                ) : (
                    <button
                        key={item.id}
                        onClick={() => {
                            this.controller.switchSelectedFlavour(i);
                        }}
                        className="btn flavour"
                    >
                        {item.flavour}
                    </button>
                )
        );
        return (
            <div id="menuitem">
                <div id="menuitem-info">
                    <h1>{this.controller.selectedFlavour?.fullName}</h1>
                    <h3>
                        Price:{' '}
                        <p className="price">
                            ${this.controller.selectedFlavour?.price}
                        </p>
                    </h3>
                    <p className="desc">
                        {this.controller.selectedFlavour?.description}
                    </p>
                    <div id="flavours">
                        <h3>Flavours</h3>
                        <div>{flavours}</div>
                    </div>
                    <div>
                        <div id="qty-chooser">
                            <button className="btn">-</button>
                            <input
                                type="number"
                                name="qty"
                                id="qty"
                                defaultValue={1}
                                min={1}
                                readOnly={true}
                            />
                            <button className="btn">+</button>
                        </div>
                        <button
                            className="btn"
                            id="add-to-cart-btn"
                            onClick={() => {
                                const qty: HTMLInputElement = document.getElementById(
                                    'qty'
                                ) as HTMLInputElement;
                                this.controller.appCtrl.addToCart(
                                    this.controller.selectedFlavour as MenuItem,
                                    qty.valueAsNumber
                                );
                            }}
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
                <img
                    src={this.controller.selectedFlavour?.imgUrl}
                    alt={this.controller.selectedFlavour?.fullName}
                />
            </div>
        );
    }

    private get controller() {
        return this.props.controller;
    }
}
