import React from 'react';

import './DashboardCard.css';

interface DashboardCardProps {
    // TODO - Refactor this to use context instead
    cardItemName: string;
    cardItemData: [];
}

function DashboardCard({
    cardItemData: cardItemData,
    cardItemName: cardItemName,
}: DashboardCardProps) {
    return (
        <div className="dashboard-card">
            <h4>{cardItemName} </h4>
            <h1>{cardItemData.length}</h1>
        </div>
    );
}

export default DashboardCard;
