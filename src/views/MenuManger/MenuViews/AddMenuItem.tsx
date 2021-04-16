import '../MenuManager.css';
import { useState, useEffect } from 'react';
import { IngredientsHooks, MenuHooks } from '../../../hooks';
import Creatable from 'react-select/creatable';
import { Ingredient, MenuItemCategory } from '../../../models';
import { toast } from 'react-toastify';

export default function AddMenuItem() {
    var ingredientLst = IngredientsHooks.useIngredients();
    var categoryLst = MenuHooks.useCategories();
    var newIngredients: Ingredient[] = [];

    const [flavours, setFlavours] = useState<string[]>([]);
    useEffect(() => {
        let items: string[] = [];
        categoryLst.forEach((category) => {
            category.menuitems.forEach((menuitem) => {
                items.push(menuitem.flavour);
            });
        });
        setFlavours(items);
    }, [categoryLst]);

    const [ingredients, setIngredients] = useState(
        [...ingredientLst].map((ing) => ing.name)
    );
    const [categories, setCategories] = useState<MenuItemCategory[]>([
        ...categoryLst,
    ]);
    const [flavour, setFlavour] = useState('');
    const [price, setPrice] = useState('0');
    const [imgURL, setImgURL] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        setIngredients([...ingredientLst].map((ing) => ing.name));
    }, [ingredientLst]);
    useEffect(() => {
        setCategories(categoryLst);
    }, [categoryLst]);

    let category: { value: string; label: string }[] = [];
    categories.map((cat) => {
        category.push({ value: cat.name, label: cat.name });
    });
    let ingredient: {}[] = [];
    ingredients.map((ing) => {
        ingredient.push({ value: ing, label: ing });
    });

    const [selectedOption, setSelectedOption] = useState({
        value: '',
        label: '',
    });
    const [
        selectedOptionIngredient,
        setSelectedOptionIngredient,
    ] = useState<any>({
        value: category.length > 0 ? category[0].value : '',
        label: category.length > 0 ? category[0].value : '',
    });

    function handleChange(option: any) {
        setSelectedOption(option);
    }
    function handleChangeIngredient(option: any) {
        setSelectedOptionIngredient(option);
    }

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
        dropdownIndicator: (base: any) => ({
            ...base,
            color: 'black',
        }),
    };
    async function findCategory(cat: string) {
        let res = await fetch(`http://localhost:9090/categories`);
        let cats: MenuItemCategory[] = await res.json();

        for (let i of cats) {
            if (i.name === cat) {
                return i.id;
            }
        }
    }
    async function findIngredients(ings: string[]) {
        let res = await fetch(`http://localhost:9090/ingredients`);
        let ing: Ingredient[] = await res.json();

        let lst = ing.filter((ingredient) => ings.includes(ingredient.name));
        return lst;
    }

    async function handleSubmit(event: any) {
        event.preventDefault();

        if (selectedOption.value === '') {
            toast('Category Required', { className: 'error-toast' });
        }
        if (selectedOptionIngredient.value === '') {
            toast('Ingredients Required', { className: 'error-toast' });
        }
        if (
            selectedOption.value !== '' &&
            selectedOptionIngredient.value !== ''
        ) {
            let selected = [...selectedOptionIngredient].map(
                (ingredient) => ingredient.value
            );
            newIngredients = selected.filter(
                (ingredient) => !ingredients.includes(ingredient)
            );
            let exists = false;
            for (let i of categories) {
                if (i.name === selectedOption.value) {
                    exists = true;
                    break;
                }
            }
            if (exists === false && selectedOption.label !== '') {
                await fetch('http://localhost:9090/categories/add', {
                    method: 'POST',
                    body: JSON.stringify({ category: selectedOption.label }),
                })
                    .then((res) => res.json())
                    .catch((err) => console.log(err));
            }
            if (newIngredients.length > 0) {
                await fetch('http://localhost:9090/ingredients/add', {
                    method: 'POST',
                    body: JSON.stringify({
                        new_items: newIngredients,
                    }),
                });
            }

            let convSelected = selected as Array<string>;
            let updatedIngredientLst = await findIngredients(convSelected);
            let ingredientsWithIDs = updatedIngredientLst.filter((ingredient) =>
                selected.includes(ingredient.name)
            );
            let ingredientIDs = [];
            for (let ing of ingredientsWithIDs) {
                ingredientIDs.push(ing.id);
            }

            if (flavours.includes(flavour)) {
                toast('Flavour already exists for selected category', {
                    className: 'error-toast',
                });
            } else {
                await fetch('http://localhost:9090/menuitems/add', {
                    method: 'POST',
                    body: JSON.stringify({
                        flavour: flavour,
                        price: price,
                        description: description,
                        imgURL: imgURL,
                        ids: ingredientIDs,
                        categoryID: await findCategory(selectedOption.label),
                    }),
                })
                    .then((res) => res.json())
                    .then((data) =>
                        data.message === 'success'
                            ? (toast('Menuitem added successfully!', {
                                  className: 'success-toast',
                              }),
                              setFlavour(''),
                              setImgURL(''),
                              setPrice('0'),
                              setDescription(''),
                              setSelectedOptionIngredient({
                                  value:
                                      category.length > 0
                                          ? category[0].value
                                          : '',
                                  label:
                                      category.length > 0
                                          ? category[0].value
                                          : '',
                              }),
                              setSelectedOption({
                                  value: '',
                                  label: '',
                              }))
                            : toast('Could not add menuitem', {
                                  className: 'error-toast',
                              })
                    )
                    .catch((err) => console.log(err));
            }
        }
    }

    return (
        <div className="con">
            <div className="form-con">
                <form
                    className="item-form"
                    onSubmit={(e) => {
                        handleSubmit(e);
                    }}
                >
                    <label htmlFor="category">
                        Category:{' '}
                        <span>(Select category or enter new category)</span>
                    </label>
                    <Creatable
                        styles={customStyles}
                        value={selectedOption}
                        onChange={handleChange}
                        theme={customTheme}
                        placeholder="Select a Category or Add New"
                        options={category}
                        components={{
                            IndicatorSeparator: () => null,
                        }}
                        label="category"
                    />
                    <label htmlFor="category">Ingredients:</label>
                    <Creatable
                        styles={customStyles}
                        value={selectedOptionIngredient.value}
                        onChange={handleChangeIngredient}
                        theme={customTheme}
                        placeholder="Select Ingredients or Add New..."
                        isMulti
                        options={ingredient}
                        components={{
                            IndicatorSeparator: () => null,
                        }}
                        label="category"
                    />
                    <label>
                        Flavor:
                        <br />
                        <input
                            type="text"
                            name="flavour"
                            value={flavour}
                            required
                            onChange={(e) => setFlavour(e.target.value)}
                        />
                    </label>
                    <label>
                        Price: ($)
                        <input
                            type="number"
                            required
                            name="price"
                            min="0"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            step="0.01"
                        />
                    </label>
                    <label>
                        Description:
                        <br />
                        <textarea
                            name="description"
                            id="desc"
                            cols={30}
                            rows={6}
                            value={description}
                            required
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                    </label>
                    <label>
                        Profile Image URL:
                        <br />
                        <input
                            type="url"
                            required
                            name="profile-pic"
                            value={imgURL}
                            onChange={(e) => setImgURL(e.target.value)}
                        />
                    </label>
                    <input type="submit" value="submit" className="submit" />
                </form>
            </div>
        </div>
    );
}
