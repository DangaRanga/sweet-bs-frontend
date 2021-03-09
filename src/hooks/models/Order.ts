import { Customer, OrderItem } from ".";
import DbModel from "./DbModel";

/** 
 * A base order class representing an Order in the database 
 * @abstract
 */
interface BaseOrder extends DbModel{
    /** Whether or not the order has been complete*/
    complete:boolean;
    /** The items in the order */
    items:OrderItem[];
}

/** 
 * Orders sent from the server 
 * for the admin order collator 
 * will also have a customer's information attached to it. 
 */
interface ForAdminPortal extends BaseOrder{
    user: Customer
}

/**
 * Orders placed by a customer on teh website will have the jwt
 * attached to it
 */
interface FromCustomer extends BaseOrder{
    jwt: string
}

/** An order may be placed by a customer on the website or
 * an order may be sent from the database, by the server
 * for the admin portal.
 * 
 */
type Order = FromCustomer | ForAdminPortal;

export default Order;