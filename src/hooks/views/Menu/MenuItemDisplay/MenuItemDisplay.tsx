import { Component } from 'react';
import { MenuController } from '../../controllers';
import './MenuItemDisplay.css';
import placeholder from '../../assets/big_cake.png';
import { DoneRounded } from '@material-ui/icons';
interface MenuItemDisplayProps {
    controller: MenuController;
}

interface MenuItemDisplayState {}

/**
 * Displays the details of a menu item of a selected flavour and category.
 * Allows the user to switch flavours
 */
export default class MenuItemDisplay extends Component<
    MenuItemDisplayProps,
    MenuItemDisplayState
> {
    render() {
        // build the list of flavour buttons and register an onclick handler to each to switch the flavour
        const flavours = this.props.controller.selectedCategory.menuitems.map(
            (item, i) =>
                item.id === this.props.controller.selectedFlavour?.id ? (
                    <button
                        key={item.id}
                        onClick={() => {
                            this.props.controller.switchSelectedFlavour(i);
                        }}
                        className="btn flavour selected"
                    >
                        {item.flavour}
                    </button>
                ) : (
                    <button
                        key={item.id}
                        onClick={() => {
                            this.props.controller.switchSelectedFlavour(i);
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
                    <h1>{this.props.controller.selectedFlavour?.fullName}</h1>
                    <h3>
                        Price:{' '}
                        <p className="price">
                            ${this.props.controller.selectedFlavour?.price}
                        </p>
                    </h3>
                    <p className="desc">
                        {this.props.controller.selectedFlavour?.description}
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
                                    this.props.controller.decrementMenuQty()
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
                                    this.props.controller.incrementMenuQty()
                                }
                            >
                                +
                            </button>
                        </div>
                        <button
                            className="btn primary filled"
                            id="add-to-cart-btn"
                            onClick={() => {
                                this.props.controller.addToCart();
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
                        src={placeholder}
                        //src={this.controller.selectedFlavour?.imgUrl}
                        alt={this.props.controller.selectedFlavour?.fullName}
                    />
                </div>
            </div>
        );
    }
}
