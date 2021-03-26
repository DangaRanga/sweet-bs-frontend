import '../ShoppingList.css';
import { Ingredient } from '../../../models';
import ostock from '../../../assets/icons/check_box_outline_blank_black_24dp.svg';
import istock from '../../../assets/icons/check_box_black_24dp.svg';

interface IngredientDisplayProps {
    ingredient: Ingredient;
}

export default function IngredientDisplay(props: IngredientDisplayProps) {
    async function postData(event: any) {
        event.preventDefault();
        let stock = '';
        props.ingredient.in_stock === true ? (stock = 'no') : (stock = 'yes');

        await fetch('http://localhost:9090/ingredients/setstock', {
            method: 'POST',
            body: JSON.stringify({ id: props.ingredient.id, stock: stock }),
        })
            .then((res) => res.json())
            .then((data) => console.log(data))
            .catch((err) => console.log(err));
    }

    return (
        <div>
            <div className="ingredient-info">
                <p>{props.ingredient.id}</p>
                <p>{props.ingredient.name}</p>

                {props.ingredient.in_stock === true ? (
                    <img
                        onClick={(e) => {
                            postData(e);
                        }}
                        src={istock}
                        alt="In Stock"
                    />
                ) : (
                    <img
                        onClick={(e) => {
                            postData(e);
                        }}
                        src={ostock}
                        alt="Out of Stock"
                    />
                )}
            </div>
            <hr />
        </div>
    );
}
