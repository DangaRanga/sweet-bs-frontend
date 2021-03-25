import './MenuItemDisplay.css';
import placeholder from '../../../assets/big_cake.png';
import { DoneRounded } from '@material-ui/icons';
import { MenuItem, MenuItemCategory } from '../../../models';
import { AppHooks, MenuHooks } from '../../../hooks';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

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
            <CSSTransition
                key={`css-transition-${item.id}`}
                onExit={() => {
                    props.selected.flavour >
                        props.category.menuitems.length - 2 &&
                        props.updateSelected({
                            type: 'flavour',
                            index: props.category.menuitems.length - 2,
                        });
                }}
                timeout={{
                    appear: 600,
                    enter: 600,
                    exit: 400,
                }}
                unmountOnExit={true}
                mountOnEnter={true}
                addEndListener={() => {}}
                classNames="flavour"
            >
                <button
                    key={item.id}
                    onClick={() => {
                        props.updateSelected({ type: 'flavour', index: i });
                    }}
                    className="btn flavour selected"
                >
                    {item.flavour}
                </button>
            </CSSTransition>
        ) : (
            <CSSTransition
                key={`css-transition-${item.id}`}
                onExit={() => {
                    props.selected.flavour >
                        props.category.menuitems.length - 2 &&
                        props.updateSelected({
                            type: 'flavour',
                            index: props.category.menuitems.length - 2,
                        });
                }}
                mountOnEnter={true}
                unmountOnExit={true}
                addEndListener={() => {}}
                classNames="flavour"
                timeout={{
                    appear: 600,
                    enter: 600,
                    exit: 300,
                }}
            >
                <button
                    key={item.id}
                    onClick={() => {
                        props.updateSelected({ type: 'flavour', index: i });
                    }}
                    className="btn flavour"
                >
                    {item.flavour}
                </button>
            </CSSTransition>
        )
    );

    const [qty, updateQty] = MenuHooks.useQuantity();

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
                    <TransitionGroup>{flavours}</TransitionGroup>
                    {/*  <div>{flavours}</div> */}
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
                            type="number"
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
                    <button
                        className="btn primary filled"
                        id="add-to-cart-btn"
                        onClick={() => {
                            console.log('hi');
                            props.updateCart({
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
