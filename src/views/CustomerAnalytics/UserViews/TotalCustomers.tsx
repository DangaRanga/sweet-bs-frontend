import '../CustomerAnalytics.css';
import { User } from '../../../models';
import { useState, useEffect } from 'react';

interface TotalCustomersProps {
    users: User[];
}

export default function TotalCustomers(props: TotalCustomersProps) {
    const [customers, setCustomers] = useState(0);

    useEffect(() => {
        let total = 0;
        for (let i of props.users) {
            if (i.is_admin != true) {
                total += 1;
            }
        }
        setCustomers(total);
    }, [props.users]);

    return (
        <div className="total-customers">
            <p>Total Customers</p>
            <h2>{customers}</h2>
        </div>
    );
}
