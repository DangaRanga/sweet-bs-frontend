import {DbModel} from ".";

/** Represents ingredients in the database */
export default interface Ingredient extends DbModel{
    /** The ingredient name */
    name: string
}