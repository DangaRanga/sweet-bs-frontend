import '../CustomerAnalytics.css';
import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { Order, User } from '../../../models';
import { fromJSON } from '../../../utils/JsonUtils';
import { Link, useParams } from 'react-router-dom';
import { AnalyticsHooks } from '../../../hooks';
import { Spinner } from '../../../components';
import UserOrderDisplay from './UserOrderDisplay';

export default function UserOrders() {
    let users = AnalyticsHooks.useUsers();
    const id = parseInt(useParams<{ id: string }>().id);

    const [user, setUser] = useState<User>();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [loadingUser, setLoadingUser] = useState(true);

    useEffect(() => {
        let usr = users.filter((u) => u.id === id)[0];
        if (usr !== undefined) {
            setUser(usr);
        }
        setLoading(false);
    }, [users]);
    useEffect(() => {
        if (user !== undefined) {
            setLoadingUser(false);
        }
    }, [user]);

    const getUserOrders = async (uid: number) => {
        await fetch(`http://localhost:9090/orders/${uid}`)
            .then((res) => res.json())
            .then((data) => data.map((v: any) => fromJSON<Order>(v)))
            .then((list) => {
                setOrders(list);
            })
            .catch((error) => console.log(error));
    };
    useEffect(() => {
        getUserOrders(id);
    }, []);

    const sortOptions = [
        { value: 'complete', label: 'Completed' },
        { value: 'not-complete', label: 'Not Completed' },
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
            boxShadow: '-2px 2px 14px -5px rgba(0, 0, 0, 0.75)',
        }),
        dropdownIndicator: (base: any) => ({
            ...base,
            color: 'black',
        }),
    };

    useEffect(() => {
        selectedOption.value === 'completed'
            ? setOrders(
                  [...orders].sort((a, b) => (a.complete === false ? 1 : -1))
              )
            : setOrders(
                  [...orders].sort((a, b) => (a.complete === true ? 1 : -1))
              );
    }, [selectedOption]);

    return (
        <div>
            {loading || loadingUser ? (
                <Spinner />
            ) : (
                <div>
                    {user === undefined ? (
                        <div>
                            <h1>User Not Found</h1>
                        </div>
                    ) : (
                        <div id="user-order">
                            <div className="header">
                                <Link to="/portal/customers">
                                    Back To Customers
                                </Link>
                                <h1>
                                    Orders For{' '}
                                    {user.firstname + ' ' + user.lastname}
                                </h1>
                                <div>
                                    <button className="btn">Refresh</button>
                                </div>
                                <div className="select">
                                    <label>Sort by </label>
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
                            <div className="order-card">
                                <div className="user-order-titles">
                                    <p>Order ID</p>
                                    <p>Order Status</p>
                                    <p>Order Total</p>
                                    <p>Order Date</p>
                                    <p>View Order</p>
                                </div>
                                <hr />
                                {orders.map((order) => (
                                    <UserOrderDisplay
                                        key={order.id}
                                        order={order}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
