import './CustomerAnalytics.css';
import React from 'react';
import { useState, useEffect } from 'react';
import Select from 'react-select';
import { User } from '../../models';
import { AnalyticsHooks } from '../../hooks';
import UserDisplay from './UserViews/UserDisplay';
import TotalCustomers from './UserViews/TotalCustomers';
import UserDetails from './UserViews/UserDetails';
import Pagination from './UserViews/Pagination';

interface CustomerAnalyticsProps {}

export default function CustomerAnalytics(props: CustomerAnalyticsProps) {
    const sortOptions = [
        { value: 'name', label: 'Name' },
        { value: 'orders', label: 'Orders Placed' },
    ];
    const [selectedOption, setSelectedOption] = useState({
        value: 'name',
        label: 'Name',
    });

    function handleChange(option: any) {
        setSelectedOption(option);
    }

    var users = AnalyticsHooks.useUsers();

    const [usr, setUsr] = useState<User>(users[0]);
    const [userLst, setUserLst] = useState<User[]>([...users]);
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(9);
    const [totalOrders, setTotalOrders] = useState(0);

    function getUser(user: User) {
        setUsr(user);
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
            boxShadow: '-2px 2px 14px -5px rgba(0, 0, 0, 0.75)',
        }),
        dropdownIndicator: (base: any) => ({
            ...base,
            color: 'black',
        }),
    };

    useEffect(() => {
        selectedOption.value === 'name'
            ? setUserLst(
                  [...users]
                      .filter((user) => !user.is_admin)
                      .sort((a, b) => (a.lastname > b.lastname ? 1 : -1))
              )
            : setUserLst(
                  [...users]
                      .filter((user) => !user.is_admin)
                      .sort((a, b) =>
                          a.orders_placed > b.orders_placed ? -1 : 1
                      )
              );
    }, [users, selectedOption]);
    useEffect(() => {
        let total = users
            .map((user) => user.orders_placed)
            .reduce((a, b) => a + b, 0);
        setTotalOrders(total);
    }, [users]);

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = userLst.slice(indexOfFirstUser, indexOfLastUser);

    function paginate(pageNumber: number) {
        setCurrentPage(pageNumber);
    }

    return (
        <div id="cust-analytics">
            <div className="analytics">
                <div className="cards">
                    <div className="analytics-title">
                        <h1>Customer Analytics</h1>
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
                    <div className="customer-list">
                        <h2>Customer List</h2>
                        <div className="lst">
                            <hr />
                            <div className="customer-info-title">
                                <p className="titles">Name</p>
                                <p className="titles">Email Address</p>
                                <p className="titles">Orders Placed</p>
                            </div>
                            <hr />
                            {currentUsers.map((user) => (
                                <div>
                                    <UserDisplay
                                        key={user.id}
                                        user={user}
                                        onClickUser={getUser}
                                    />
                                </div>
                            ))}
                        </div>
                        <Pagination
                            usersPerPage={usersPerPage}
                            totalUsers={userLst.length}
                            paginate={paginate}
                        />
                    </div>
                    <div>
                        <TotalCustomers users={users} />
                    </div>
                    <div className="total-orders">
                        <p>Total Orders</p>
                        <h2>{totalOrders}</h2>
                    </div>
                    <div className="details">
                        <UserDetails usr={usr} />
                    </div>
                </div>
            </div>
        </div>
    );
}
