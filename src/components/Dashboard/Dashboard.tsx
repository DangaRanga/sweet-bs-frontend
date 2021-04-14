import React from 'react';

import { DashboardCard } from './DashboardCard';
import { DashboardChart } from './DashboardChart';

import './Dashboard.css';

function Dashboard() {
    return (
        <div id="dashboard">
            <h1>Dashboard</h1>
            <section id="dashboard-card-group">
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
            </section>
            <section id="dashboard-graphs">
                <DashboardChart></DashboardChart>
            </section>
        </div>
    );
}

export default Dashboard;
