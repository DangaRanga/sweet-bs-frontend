import { MenuItemCategory, Ingredient, DbModel } from '.';

/** Represents menu items in the database */
export default interface MenuItem extends DbModel {
    /** The price of the menu item */
    price: number;
    /** The flavour of the menu item */
    flavour: string;
    /** A description of the menu item */
    description: string;
    /** A url to an image of the item */
    image_url: string;
    /** The category the menu item belongs to */
    category: MenuItemCategory;
    /** The ingredients used to make this menu item */
    ingredients: Ingredient[];
}
