import { DbModel, Order } from '.';

/**
 * Represents a user in the database
 * @abstract
 */
export default interface User extends DbModel {
    id: number;
    username: string;
    email: string;
    password: string;
    firstname: string;
    lastname: string;
    address: string;
    /** Indicates whether or not this user has administraitive privledges */
    is_admin: boolean;
    /** A unique public uuid attached to this user */
    public_id: string;
    /** The date on which this user was created */
    created_on: Date;
    orders_placed: number;
}

/**
 * Represents a user with administraitive privledges in the database
 */
export interface Admin extends User {
    is_admin: true;
}

/**
 * Represents a Customer in the database
 */
export interface Customer extends User {
    /** The number of orders placed by this customer */
    orders_placed: number;
    /** The address to which this customer's orders are delivered */
    address: string;
    is_admin: false;
    orders: Order[];
}
