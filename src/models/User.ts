import DbModel  from './DbModel';
import { Email } from './index';

export abstract class User extends DbModel {
    private _username: string;
    private _email: Email;
    private _password: string;
    private _firstname: string;
    private _lastname: string;
    private _isAdmin: boolean;
    private _publicId: string;
    private _createdOn: Date;

    constructor(
        username: string,
        password: string,
        email: string,
        firstname: string,
        lastname: string,
        createdOn: string,
        isAdmin: boolean,
        publicId: string,
        id?: number
    ) {
        super(id);
        this._username = username;
        this._createdOn = new Date(createdOn);
        this._email = email as Email;
        this._password = password;
        this._firstname = firstname;
        this._lastname = lastname;
        this._isAdmin = isAdmin;
        this._publicId = publicId;
    }

    public get username(): string {
        return this._username;
    }

    public set username(value: string) {
        this._username = value;
    }

    public get password(): string {
        return this._password;
    }

    public set password(value: string) {
        this._password = value;
    }

    public get email(): string {
        return this._email;
    }

    public set email(value: string) {
        this._email = value as Email;
    }

    public get firstname(): string {
        return this._firstname;
    }

    public set firstname(value: string) {
        this._firstname = value;
    }

    public get lastname(): string {
        return this._lastname;
    }

    public set lastname(value: string) {
        this._lastname = value;
    }

    public get isAdmin(): boolean {
        return this._isAdmin;
    }

    public get publicId(): string {
        return this._publicId;
    }

    public get createdOn(): Date {
        return this._createdOn;
    }

    
    public get localStorageFormat() : string {
        return JSON.stringify(this.toJSON());
    }
    
}

export class Customer extends User {
    private _ordersPlaced: number;
    private _address: string;

    constructor(
        username: string,
        password: string,
        email: string,
        firstname: string,
        lastname: string,
        createdOn: string,
        publicId: string,
        ordersPlaced: number,
        address: string,
        id?: number
    ) {
        super(
            username,
            password,
            email,
            firstname,
            lastname,
            createdOn,
            false,
            publicId,
            id
        );
        this._address = address;
        this._ordersPlaced = ordersPlaced;
    }

    public get address(): string {
        return this._address;
    }

    public set address(value: string) {
        this._address = value;
    }

    public get ordersPlaced(): number {
        return this._ordersPlaced;
    }

    public toJSON(): object {
        return this.id
            ? {
                  id: this.id,
                  username: this.username,
                  password: this.password,
                  email: this.email,
                  firstname: this.firstname,
                  lastname: this.lastname,
                  created_on: this.createdOn,
                  public_id: this.publicId,
                  orders_placed: this.ordersPlaced,
                  address: this.address,
              }
            : {
                  username: this.username,
                  password: this.password,
                  email: this.email,
                  firstname: this.firstname,
                  lastname: this.lastname,
                  created_on: this.createdOn,
                  public_id: this.publicId,
                  orders_placed: this.ordersPlaced,
                  address: this.address,
              };
    }

    public static fromJSON(json: any): Customer {
        return new Customer(
            json['username'],
            json['password'],
            json['email'],
            json['firstname'],
            json['lastname'],
            json['created_on'],
            json['public_id'],
            json['orders_placed'],
            json['address'],
            json['id']
        );
    }
}

export class Admin extends User {
    constructor(
        username: string,
        password: string,
        email: string,
        firstname: string,
        lastname: string,
        createdOn: string,
        publicId: string,
        id?: number
    ) {
        super(
            username,
            password,
            email,
            firstname,
            lastname,
            createdOn,
            true,
            publicId,
            id
        );
    }

    public toJSON(): object {
        return this.id
            ? {
                  id: this.id,
                  username: this.username,
                  password: this.password,
                  email: this.email,
                  firstname: this.firstname,
                  lastname: this.lastname,
                  created_on: this.createdOn,
                  public_id: this.publicId,
              }
            : {
                  username: this.username,
                  password: this.password,
                  email: this.email,
                  firstname: this.firstname,
                  lastname: this.lastname,
                  created_on: this.createdOn,
                  public_id: this.publicId,
              };
    }

    public static fromJSON(json: any): Admin {
        return new Admin(
            json['username'],
            json['password'],
            json['email'],
            json['firstname'],
            json['lastname'],
            json['created_on'],
            json['public_id'],
            json['id']
        );
    }
}
