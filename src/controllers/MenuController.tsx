import { MenuItem, MenuItemCategory } from '../models';
import { Menu } from '../views';
import { AppController } from '.';
import ViewController from './ViewController';

export default class MenuController extends ViewController {
    private _menuView: Menu;

    constructor(menu: Menu, app: AppController) {
        super(app);
        this._menuView = menu;
    }

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

    public switchSelectedCategory(index: number): void {
        this._menuView.setState({
            selectedCategory: index,
            selectedFlavour: 0,
        });
    }

    public switchSelectedFlavour(index: number): void {
        this._menuView.setState({ selectedFlavour: index });
    }

    public increaseMenuQty(): void {
        const qty = document.getElementById('qty') as HTMLInputElement;
        qty.valueAsNumber += 1;
    }

    public decreaseMenuQty(): void {
        const qty = document.getElementById('qty') as HTMLInputElement;
        if (qty.valueAsNumber > 1) {
            qty.valueAsNumber -= 1;
        }
    }

    public triggerAddToCart(menuitem: MenuItem, qty: number): void {
        this.appCtrl.addToCart(menuitem, qty);
        const btn = document.getElementById('add-to-cart-btn')!;
        var children = btn.children;
        console.log(children);
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

    public get selectedCategory(): MenuItemCategory {
        return this._menuView.state.items[
            this._menuView.state.selectedCategory
        ];
    }

    public get selectedCategoryIndex(): number {
        return this._menuView.state.selectedCategory;
    }

    public get selectedFlavour(): MenuItem | undefined {
        var category = this._menuView.state.items[
            this._menuView.state.selectedCategory
        ];
        var menuitems = category.menuitems;
        return menuitems
            ? menuitems[this._menuView.state.selectedFlavour]
            : undefined;
    }

    public get categories(): MenuItemCategory[] {
        return this._menuView.state.items;
    }

    public get isCartLoaded(): boolean {
        return this._menuView.state.items.length > 0;
    }
}
