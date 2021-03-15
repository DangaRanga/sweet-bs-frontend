import './CustomerAnalytics.css';
import { AnalyticsHooks } from '../../hooks';
import UserDisplay from './UserViews/UserDisplay';
import TotalCustomers from './UserViews/TotalCustomers';
import UserDetails from './UserViews/UserDetails';
import { useState, useEffect } from 'react';
import { User } from '../../models';

interface CustomerAnalyticsProps {}

export default function CustomerAnalytics(props: CustomerAnalyticsProps) {
    let users = AnalyticsHooks.useUsers();

    const [usr, setUsr] = useState<User>(users[0]);

    function getUser(user: User) {
        setUsr(user);
    }

    return (
        <div className="container">
            <div className="nav"></div>
            <div className="dashboard"></div>
            <div className="analytics">
                <div className="cards">
                    <div className="customer-list">
                        <h2>Customer List</h2>
                        <hr />
                        <div className="customer-info">
                            <p className="titles">Name</p>
                            <p className="titles">Location</p>
                            <p className="titles">Total Orders</p>
                        </div>
                        <hr />
                        {users.map((user) => (
                            <div>
                                <UserDisplay
                                    key={user.id}
                                    user={user}
                                    onClickUser={getUser}
                                />
                            </div>
                        ))}
                    </div>
                    <div>
                        <TotalCustomers users={users} />
                    </div>
                    <div className="total-orders">Number</div>
                    <div className="updates">Latest Updates</div>
                    <div>
                        <UserDetails usr={usr} />
                    </div>
                </div>
            </div>
        </div>
    );
}
