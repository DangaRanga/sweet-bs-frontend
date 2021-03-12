import { MenuItem, DbModel } from '.';

/** Represents a menu item category in the database */
export default interface MenuItemCategory extends DbModel {
    /** The category name */
    name: string;
    /** The menu items in this category */
    menuitems: MenuItem[];
}
