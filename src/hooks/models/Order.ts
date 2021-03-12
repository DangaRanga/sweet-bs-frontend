import { Customer, OrderItem,DbModel } from ".";

/** 
 * A base order interface representing an Order in the database 
 * @abstract
 */
interface Order extends DbModel{
    /** Whether or not the order has been complete*/
    complete:boolean;
    /** The items in the order */
    items:OrderItem[];
    /**The customer who made the order. Typically the customer would only be present when the order is sent to the Order Collator */
    user?:Customer;
}



/** An order may be placed by a customer on the website or
 * an order may be sent from the database, by the server
 * for the admin portal.
 * 
 */

export default Order;