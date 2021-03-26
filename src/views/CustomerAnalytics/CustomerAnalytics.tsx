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
import logo from "../../assets/CLIENT/Sweet B's Long.png";

interface CustomerAnalyticsProps {}

export default function CustomerAnalytics(props: CustomerAnalyticsProps) {
    const sortOptions = [
        { value: 'date', label: 'Date Created' },
        { value: 'name', label: 'Name' },
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
    const [usersPerPage] = useState(10);

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
                  [...users].sort((a, b) =>
                      a.firstname > b.firstname ? 1 : -1
                  )
              )
            : setUserLst(
                  [...users].sort((a, b) =>
                      a.created_on > b.created_on ? 1 : -1
                  )
              );
        console.log(selectedOption.value);
    }, [users, selectedOption]);

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
                                <p className="titles">Location</p>
                                <p className="titles">Total Orders</p>
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
                    <div className="total-orders">Number</div>
                    <div className="updates">
                        <h2>Latest Updates</h2>
                    </div>
                    <div>
                        <UserDetails usr={usr} />
                    </div>
                </div>
            </div>
        </div>
    );
}
