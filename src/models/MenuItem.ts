import { Ingredient, MenuItemCategory } from '.';
import DbModel from './DbModel';

/**
 * Represents a menu item in the database
 */
export default class MenuItem extends DbModel {
    /** The price of the menu item */
    private _price: number;
    /** The flavour of the menu item */
    private _flavour: string;
    /** A description of the menu item */
    private _description: string;
    /** A url to an image of the item */
    private _imgUrl: string;
    /** The category the menu item belongs to */
    private _category: MenuItemCategory;
    /** The ingredients used to make this menu item */
    private _ingredients: Ingredient[];

    constructor(
        price: number,
        flavour: string,
        desc: string,
        imgUrl: string,
        category: MenuItemCategory,
        ingredients: Ingredient[],
        id?: number
    ) {
        super(id);
        this._price = price;
        this._flavour = flavour;
        this._description = desc;
        this._imgUrl = imgUrl;
        this._category = category;
        this._ingredients = ingredients;
    }
    
    public toObject(): object {
        return this.id
            ? {
                  id: this.id,
                  flavour: this.flavour,
                  category: this.category.toObject(),
                  description: this.description,
                  price: this.price,
                  img_url: this.imgUrl,
                  ingredients: this.ingredients.map((v) => v.toObject()),
              }
            : {
                  flavour: this.flavour,
                  category: this.category.toObject(),
                  description: this.description,
                  price: this.price,
                  img_url: this.imgUrl,
                  ingredients: this.ingredients.map((v) => v.toObject()),
              };
    }

    public toJSON(): string {
        return JSON.stringify(this.toObject());
    }

    public static fromJSON(json: any): MenuItem {
        return new MenuItem(
            json['price'],
            json['flavour'],
            json['description'],
            json['img_url'],
            MenuItemCategory.fromJSON(json['category']),
            json['ingredients']?.map((v: any) => Ingredient.fromJSON(v)) ?? [],
            json['id']
        );
    }

    public get price(): number {
        return this._price;
    }

    public get flavour(): string {
        return this._flavour;
    }

    public get description(): string {
        return this._description;
    }

    public get imgUrl(): string {
        return this._imgUrl;
    }

    public get category(): MenuItemCategory {
        return this._category;
    }

    public get fullName(): string {
        return [this.flavour, this.category.name].join(' ');
    }

    public get ingredients(): Ingredient[] {
        return this._ingredients;
    }
    public set ingredients(value: Ingredient[]) {
        this._ingredients = value;
    }
}
