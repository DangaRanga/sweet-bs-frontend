import './MenuItemDisplay.css';
import placeholder from '../../../assets/big_cake.png';
import { MenuItem, MenuItemCategory } from '../../../models';
import { AppHooks, MenuHooks, RiveHooks } from '../../../hooks';
import Rive from 'rive-js';

interface MenuItemDisplayProps {
    menuitem: MenuItem;
    category: MenuItemCategory;
    updateSelected: MenuHooks.SelectedUpdater;
    updateCart: AppHooks.CartUpdater;
    selected: MenuHooks.SelectedState;
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
                    props.updateSelected({ type: 'flavour', index: i });
                }}
                className="btn flavour selected"
            >
                {item.flavour}
            </button>
        ) : (
            <button
                key={item.id}
                onClick={() => {
                    props.updateSelected({ type: 'flavour', index: i });
                }}
                className="btn flavour"
            >
                {item.flavour}
            </button>
        )
    );

    const [qty, updateQty] = MenuHooks.useQuantity();

    const riveCanvas = RiveHooks.useRiveRef();

    const riveAddToCart = new Rive.Rive({
        src: '/assets/rive/add_to_cart.riv',
        canvas: riveCanvas.current,
        animations: 'idle',
        autoplay: true,
    });

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
                            onClick={(e) => updateQty('decrement')}
                        >
                            -
                        </button>
                        <input
                            type="text"
                            name="qty"
                            id="qty"
                            value={qty}
                            min={1}
                            readOnly={true}
                        />
                        <button
                            className="btn plus"
                            onClick={(e) => updateQty('increment')}
                        >
                            +
                        </button>
                    </div>
                    <canvas
                        onClick={() => {
                            riveAddToCart.play(['forward']);
                            setTimeout(() => {
                                riveAddToCart.play(['reverse']);
                            }, 1000);
                            setTimeout(() => {
                                props.updateCart({
                                    type: 'add',
                                    item: props.menuitem,
                                    qty: qty,
                                });
                            }, 1400);
                        }}
                        ref={riveCanvas}
                    />
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
