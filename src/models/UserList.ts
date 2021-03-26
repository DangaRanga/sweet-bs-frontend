import { User, DbModel } from '.';

/** Represents a menu item category in the database */
export default interface UserList extends DbModel {
    userlist: User[];
}
