import { MenuItem } from '.';
import DbModel from './DbModel';

/**
 * Represents an OrderItem in the database
 */
export default interface OrderItem extends DbModel{
    /** The menu item ordered */
    menuitem: MenuItem;
    /** The quantity of the menu item ordered */
    qty:number;
    /** The id of the order this order item belongs to */
    order_id?:number;
}