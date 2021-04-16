import React from 'react';
import './ShoppingList.css';
import { useState, useEffect } from 'react';
import Select from 'react-select';
import { Ingredient } from '../../models';
import { IngredientsHooks } from '../../hooks';
import IngredientDisplay from './IngredientViews/IngredientDisplay';
import IngredientsInStock from './IngredientViews/IngredientsInStock';
import Pagination from './IngredientViews/Pagination';

interface ShoppingListProps {}

export default function ShoppingList(props: ShoppingListProps) {
    var ingredientLst = IngredientsHooks.useIngredients();
    const [ingredientsNeeded, setIngredientsNeeded] = useState<Ingredient[]>(
        []
    );
    const [lst, setLst] = useState<string[]>([]);

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const getOrders = async () => {
            let res = await fetch(`http://localhost:9090/orders`);
            let data = await res.json();
            setOrders(data);
        };
        getOrders();
    }, []);

    useEffect(() => {
        const getNeeded = async () => {
            let res = await fetch(`http://localhost:9090/weeks-ingredients`);
            let data = await res.json();
            setLst(data);
        };
        getNeeded();
    }, []);
    useEffect(() => {
        setIngredientsNeeded(
            ingredientLst.filter((ingredient) => lst.includes(ingredient.name))
        );
    }, [ingredientLst, lst]);

    // Use States
    const [ingredients, setIngredients] = useState<Ingredient[]>([
        ...ingredientsNeeded,
    ]);
    const [currentPage, setCurrentPage] = useState(1);
    const [ingredientsPerPage] = useState(8);
    const [selectedOption, setSelectedOption] = useState({
        value: 'id',
        label: 'ID',
    });

    // React Select Configuration
    const sortOptions = [
        { value: 'id', label: 'ID' },
        { value: 'name', label: 'Name' },
        { value: 'stock', label: 'Stock' },
    ];
    function customTheme(theme: any) {
        return {
            ...theme,
            colors: {
                ...theme.colors,
                primary25: 'rgba(147, 119, 226, 0.5)',
            },
        };
    }
    const customStyles = {
        control: (base: any) => ({
            ...base,
            boxShadow: '-2px 2px 14px -5px rgba(0, 0, 0, 0.75)',
        }),
        dropdownIndicator: (base: any) => ({
            ...base,
            color: 'black',
        }),
    };
    function handleChange(option: any) {
        setSelectedOption(option);
    }

    // Sorting List Based on Select with useEffect
    useEffect(() => {
        if (selectedOption.value === 'name') {
            setIngredients(
                [...ingredientsNeeded].sort((a, b) =>
                    a.name > b.name ? 1 : -1
                )
            );
        } else if (selectedOption.value === 'stock') {
            setIngredients(
                [...ingredientsNeeded].sort((a) =>
                    a.in_stock === true ? 1 : -1
                )
            );
        } else {
            setIngredients(
                [...ingredientsNeeded].sort((a, b) => (a.id > b.id ? 1 : -1))
            );
        }
    }, [ingredientLst, selectedOption, ingredientsNeeded]);

    // Pagination
    const indexOfLastIngredient = currentPage * ingredientsPerPage;
    const indexOfFirstIngredient = indexOfLastIngredient - ingredientsPerPage;
    const currentIngredients = ingredients.slice(
        indexOfFirstIngredient,
        indexOfLastIngredient
    );

    function paginate(pageNumber: number) {
        setCurrentPage(pageNumber);
    }

    return (
        <div id="shopping">
            <div className="shopping-list">
                <div className="cards-shopping-list">
                    <div className="shopping-list-title">
                        <h1>Shopping List</h1>
                        <div className="sort-by">
                            <label htmlFor="sort">
                                <strong>Sort by</strong>
                            </label>
                            <Select
                                styles={customStyles}
                                value={selectedOption}
                                onChange={handleChange}
                                theme={customTheme}
                                options={sortOptions}
                                isSearchable={false}
                                components={{
                                    IndicatorSeparator: () => null,
                                }}
                                label="sort"
                            />
                        </div>
                    </div>
                    <div className="ingredients">
                        <h2>Ingredients Needed This Week</h2>
                        <div className="lst">
                            <hr />
                            <div className="ingredient-info-title">
                                <p className="titles">Ingredient ID</p>
                                <p className="titles">Ingredient Name</p>
                                <p className="titles">In Stock</p>
                            </div>
                            <hr />
                            {currentIngredients.map((ingredient) => (
                                <IngredientDisplay
                                    key={ingredient.id}
                                    ingredient={ingredient}
                                />
                            ))}
                        </div>
                        <Pagination
                            ingredientsPerPage={ingredientsPerPage}
                            totalIngredients={ingredientLst.length}
                            paginate={paginate}
                        />
                    </div>
                    <div className="total-orders-shopping">
                        <p>Total Orders</p>
                        <h2>{orders.length}</h2>
                    </div>
                    <div className="total-ingredients">
                        <p>Total Ingredients</p>
                        <h2>{ingredients.length}</h2>
                    </div>
                    <IngredientsInStock
                        ingredients={ingredients}
                        needed={false}
                    />
                    <IngredientsInStock
                        ingredients={ingredients}
                        needed={true}
                    />
                </div>
            </div>
        </div>
    );
}
