import './MenuItemDisplay.css';
import placeholder from '../../../../assets/big_cake.png';
import { DoneRounded } from '@material-ui/icons';
import { MenuItem, MenuItemCategory } from '../../../models';
import { SelectedSetter, useQuantity } from '../../../effects/MenuController';
import { CartSetter } from '../../../effects/AppController';

interface MenuItemDisplayProps {
    menuitem: MenuItem;
    category: MenuItemCategory;
    setSelected: SelectedSetter;
    setCart: CartSetter;
}

/**
 * Displays the details of a menu item of a selected flavour and category.
 * Allows the user to switch flavours
 */
export default function MenuItemDisplay(props: MenuItemDisplayProps) {
    // build the list of flavour buttons and register an onclick handler to each to switch the flavour

    const flavours = props.category.menuitems.map((item, i) =>
        item.id === props.menuitem?.id ? (
            <button
                key={item.id}
                onClick={() => {
                    props.setSelected({ type: 'flavour', index: i });
                }}
                className="btn flavour selected"
            >
                {item.flavour}
            </button>
        ) : (
            <button
                key={item.id}
                onClick={() => {
                    props.setSelected({ type: 'flavour', index: i });
                }}
                className="btn flavour"
            >
                {item.flavour}
            </button>
        )
    );

    const [qty, setQty] = useQuantity();

    return (
        <div id="menuitem">
            <div id="menuitem-info">
                <h1>
                    {props.menuitem.flavour +
                        ' ' +
                        props.menuitem.category.name}
                </h1>
                <h3>
                    Price: <p className="price">${props.menuitem.price}</p>
                </h3>
                <p className="desc">{props.menuitem.description}</p>
                <div id="flavours">
                    <h3>Flavours</h3>
                    <div>{flavours}</div>
                </div>
                <div id="add-to-cart-section">
                    <div id="qty-chooser">
                        <button
                            className="btn minus"
                            onClick={(e) => setQty('decrement')}
                        >
                            -
                        </button>
                        <input
                            type="number"
                            name="qty"
                            id="qty"
                            value={qty}
                            min={1}
                            readOnly={true}
                        />
                        <button
                            className="btn plus"
                            onClick={(e) => setQty('increment')}
                        >
                            +
                        </button>
                    </div>
                    <button
                        className="btn primary filled"
                        id="add-to-cart-btn"
                        onClick={() => {
                            props.setCart({
                                type: 'add',
                                item: props.menuitem,
                                qty: qty,
                            });
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
                    alt={
                        props.menuitem.flavour +
                        ' ' +
                        props.menuitem.category.name
                    }
                />
            </div>
        </div>
    );
}
