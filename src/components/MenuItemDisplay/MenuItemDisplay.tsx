import { Component } from 'react';
import { MenuController } from '../../controllers';
import { MenuItem } from '../../models';
import './MenuItemDisplay.css';
import placeholder from '../../assets/big_cake.png';
import { DoneRounded } from '@material-ui/icons';
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
                    <div id="add-to-cart-section">
                        <div id="qty-chooser">
                            <button
                                className="btn minus"
                                onClick={(e) =>
                                    this.controller.decreaseMenuQty()
                                }
                            >
                                -
                            </button>
                            <input
                                type="number"
                                name="qty"
                                id="qty"
                                defaultValue={1}
                                min={1}
                                readOnly={true}
                            />
                            <button
                                className="btn plus"
                                onClick={(e) =>
                                    this.controller.increaseMenuQty()
                                }
                            >
                                +
                            </button>
                        </div>
                        <button
                            className="btn primary filled"
                            id="add-to-cart-btn"
                            onClick={() => {
                                const qty: HTMLInputElement = document.getElementById(
                                    'qty'
                                ) as HTMLInputElement;
                                this.controller.triggerAddToCart(
                                    this.controller.selectedFlavour as MenuItem,
                                    qty.valueAsNumber
                                );
                            }}
                        >
                            <DoneRounded
                                id="add-to-cart-success"
                                fontSize="large"
                            />
                            <p id="first">Add</p>
                            <p id="extra-inner">ed</p>
                            <p id="extra"> to Cart</p>
                        </button>
                    </div>
                </div>
                <div id="pastry-img-div">
                    <img
                        id="pastry-img"
                        //src="https://drive.google.com/u/0/uc?id=158Whc7Szz-TRiGxCEVrKRrmDN59l312o&export=download"
                        src={placeholder}
                        //src={this.controller.selectedFlavour?.imgUrl}
                        alt={this.controller.selectedFlavour?.fullName}
                    />
                </div>
            </div>
        );
    }

    private get controller() {
        return this.props.controller;
    }
}
