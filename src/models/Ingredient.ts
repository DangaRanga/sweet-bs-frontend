import { DbModel } from '.';

/** Represents ingredients in the database */
export default interface Ingredient extends DbModel {
    /** The ingredient name */
    id: number;
    name: string;
    in_stock: boolean;
}
