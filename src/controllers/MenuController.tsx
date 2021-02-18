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
        this._menuView.setState({ selectedCategory: index });
    }

    public switchSelectedFlavour(index: number): void {
        this._menuView.setState({ selectedFlavour: index });
    }

    public get selectedCategory(): MenuItemCategory {
        return this._menuView.state.items[
            this._menuView.state.selectedCategory
        ];
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
}
