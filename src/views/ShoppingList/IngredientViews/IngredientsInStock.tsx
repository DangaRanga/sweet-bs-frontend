import '../ShoppingList.css';
import { Ingredient } from '../../../models';
import { useState, useEffect } from 'react';

interface TotalCustomersProps {
    ingredients: Ingredient[];
    needed: boolean;
}

export default function TotalCustomers(props: TotalCustomersProps) {
    const [inStock, setInStock] = useState(0);
    const [outOfStock, setOutOfStock] = useState(0);

    useEffect(() => {
        let total = 0;
        for (let i of props.ingredients) {
            if (i.in_stock === true) {
                total += 1;
            }
        }
        setInStock(total);
        setOutOfStock(props.ingredients.length - inStock);
    }, [props.ingredients, inStock]);

    return props.needed === false ? (
        <div className="total-in-stock">
            <p>Total Ingredients in Stock</p>
            <h2>{inStock}</h2>
        </div>
    ) : (
        <div className="total-needed">
            <p>Total Ingredients to Buy</p>
            <h2>{outOfStock}</h2>
        </div>
    );
}
