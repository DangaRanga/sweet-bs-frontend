import { MenuItem, MenuItemCategory } from '../models';
import { Menu } from '../views';
import { AppController } from '.';
import ViewController from './ViewController';

/**
 * Controller for the Menu View
 */
export default class MenuController extends ViewController {
    private _menuView: Menu;

    /**
     *
     * @param menu The Menu
     * @param app The App controller
     */
    constructor(menu: Menu, app: AppController) {
        super(app);
        this._menuView = menu;
    }

    /**
     * Fetch all menu items by category from the database
     */
    public async fetchMenuItems(): Promise<void> {
        this._menuView.setState({
            items: await fetch('http://0.0.0.0:9090/menuitems/category')
                .then((res) => res.json())
                .then((data) =>
                    data.map((v: any) => MenuItemCategory.fromJSON(v))
                )
                .catch((err) => []),
        });
    }

    /**
     * Changes the menu View to the selected category. Resets the selected flavour to zero as well
     * @param index The index of the selected category
     */
    public switchSelectedCategory(index: number): void {
        this._menuView.setState({
            selectedCategory: index,
            selectedFlavour: 0,
        });
    }

    /**
     * switch the currently selected flavour
     * @param index the index of the selected flavour
     */
    public switchSelectedFlavour(index: number): void {
        this._menuView.setState({ selectedFlavour: index });
    }

    /**
     * Increase the quantity of the selected item by1
     */
    public incrementMenuQty(): void {
        const qty = document.getElementById('qty') as HTMLInputElement;
        qty.valueAsNumber += 1;
    }

    /**
     * Decrease the quantity of the selected item by 1
     */
    public decrementMenuQty(): void {
        const qty = document.getElementById('qty') as HTMLInputElement;
        if (qty.valueAsNumber > 1) {
            qty.valueAsNumber -= 1;
        }
    }

    /**
     * Adds the menuitem to cart with the specified quantity.
     * Animates the add to cart button to indicate to the user that the item has been added.
     * @param menuitem the menu item to be added
     * @param qty the quantity of the menu item to be added
     */
    public addToCart(): void {
        const qty = document.getElementById('qty') as HTMLInputElement;
        // add item to cart
        this.appCtrl.addItemToCart(
            this.selectedFlavour as MenuItem,
            qty.valueAsNumber
        );

        // animate button
        const btn = document.getElementById('add-to-cart-btn')!;
        var children = btn.children;
        var text: HTMLParagraphElement = children[1] as HTMLParagraphElement;
        var icon = children[0] as SVGElement;
        var text2 = document.getElementById('extra')!;
        var text3 = document.getElementById('extra-inner')!;

        text2.style.right = '-5px';
        text3.style.opacity = '1';
        text3.style.right = '0';
        icon.style.opacity = '1';
        icon.style.left = '0';
        text.style.right = '0';
        btn.style.backgroundColor = '#3ABC41';
        setTimeout((_) => {
            text2.removeAttribute('style');
            text.removeAttribute('style');
            btn.removeAttribute('style');
            text3.removeAttribute('style');
            icon.removeAttribute('style');
        }, 2000);
    }

    /**
     * The selected menu item category
     */
    public get selectedCategory(): MenuItemCategory {
        return this._menuView.state.items[
            this._menuView.state.selectedCategory
        ];
    }

    /**
     * The index of the selected menu item category in the list of categories
     */
    public get selectedCategoryIndex(): number {
        return this._menuView.state.selectedCategory;
    }

    /**
     * The menu item coresponding to the selected flavour
     */
    public get selectedFlavour(): MenuItem | undefined {
        var category = this._menuView.state.items[
            this._menuView.state.selectedCategory
        ];
        var menuitems = category.menuitems;
        return menuitems
            ? menuitems[this._menuView.state.selectedFlavour]
            : undefined;
    }

    /**
     * Gets all the categories on the Menu
     */
    public get categories(): MenuItemCategory[] {
        return this._menuView.state.items;
    }

    /**
     * Whether or not the menu items have been fetched from the database
     */
    public get isMenuLoaded(): boolean {
        return this._menuView.state.items.length > 0;
    }
}
