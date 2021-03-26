import React from 'react';

import { DashboardCard } from './DashboardCard';

import './Dashboard.css';

function Dashboard() {
    return (
        <div id="dashboard">
            <h1>Dashboard</h1>
            <div id="dashboard-card-group">
                <DashboardCard cardItemName="Total Orders" cardItemData={[]} />
                <DashboardCard
                    cardItemName="Total Customers"
                    cardItemData={[]}
                />
                <DashboardCard
                    cardItemName="Total Menu Items"
                    cardItemData={[]}
                />
                <DashboardCard
                    cardItemName="Shopping List Items"
                    cardItemData={[]}
                />
            </div>
        </div>
    );
}

export default Dashboard;
