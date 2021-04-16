import './MenuManager.css';
import { useState, useEffect, useContext } from 'react';
import Select from 'react-select';
import { MenuHooks } from '../../hooks';
import Pagination from './MenuViews/Pagination';
import ItemDisplay from './MenuViews/ItemDisplay';
import { MenuItem } from '../../models';
import { Link } from 'react-router-dom';

interface MenuManagerProps {}

export default function MenuManager(props: MenuManagerProps) {
    const [menuitems, setMenuitems] = useState<MenuItem[]>([]);
    var menuitemCategories = MenuHooks.useCategories();

    useEffect(() => {
        let items: MenuItem[] = [];
        menuitemCategories.forEach((category) => {
            category.menuitems.forEach((menuitem) => {
                items.push(menuitem);
            });
        });
        setMenuitems(items);
    }, [menuitemCategories]);

    // Use States
    const [menuitemsLst, setMenuitemsLst] = useState<MenuItem[]>([
        ...menuitems,
    ]);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(8);

    const sortOptions = [
        { value: 'price', label: 'Price' },
        { value: 'category', label: 'Category' },
        { value: 'name', label: 'Name' },
    ];
    const [selectedOption, setSelectedOption] = useState({
        value: 'name',
        label: 'Name',
    });

    function handleChange(option: any) {
        setSelectedOption(option);
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
        control: (base: any) => ({
            ...base,
            boxShadow: '0 4px 14px rgba(0, 0, 0, 0.25)',
        }),
        dropdownIndicator: (base: any) => ({
            ...base,
            color: 'black',
        }),
    };

    // Sorting List Based on Select with useEffect
    useEffect(() => {
        if (selectedOption.value === 'name') {
            setMenuitemsLst(
                [...menuitems].sort((a, b) => (a.flavour > b.flavour ? 1 : -1))
            );
        } else if (selectedOption.value === 'category') {
            setMenuitemsLst(
                [...menuitems].sort((a, b) =>
                    a.category.name > b.category.name ? 1 : -1
                )
            );
        } else {
            setMenuitemsLst(
                [...menuitems].sort((a, b) => (a.price > b.price ? 1 : -1))
            );
        }
    }, [menuitems, selectedOption]);

    // Pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = menuitemsLst.slice(indexOfFirstItem, indexOfLastItem);

    function paginate(pageNumber: number) {
        setCurrentPage(pageNumber);
    }

    return (
        <div id="menu-manager">
            <div className="heading-title">
                <h1>Menu Manager</h1>
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
                    <Link to="/portal/menu-manager/add">
                        <button className="add-btn">Add Item</button>
                    </Link>
                </div>
            </div>

            <div className="menu-items">
                <h2>Item List</h2>
                <div className="lst">
                    <hr />
                    <div className="manager-title">
                        <p className="titles">Item ID</p>
                        <p className="titles">Item Name</p>
                        <p className="titles">Category</p>
                        <p className="titles">Price</p>
                        <p className="titles">Edit Item</p>
                        <p className="titles">Remove Item</p>
                    </div>
                    <hr />
                    {currentItems.map((item) => (
                        <ItemDisplay key={item.id} item={item} />
                    ))}
                    <Pagination
                        itemsPerPage={itemsPerPage}
                        totalItems={menuitemsLst.length}
                        paginate={paginate}
                    />
                </div>
            </div>
        </div>
    );
}
