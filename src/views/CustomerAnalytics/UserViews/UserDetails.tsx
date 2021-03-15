import '../CustomerAnalytics.css';
import { User } from '../../../models';
import { useEffect, useState } from 'react';

interface UserDetailsProps {
    usr: User;
}

export default function UserDetails(props: UserDetailsProps) {
    return (
        <div className="details">
            {props.usr == undefined ? (
                <div></div>
            ) : (
                <div>
                    <h2>Detailed Information</h2>
                    <hr />
                    <div className="detailed-info">
                        <p>
                            Name:{' '}
                            {props.usr.firstname + ' ' + props.usr.lastname}
                        </p>
                        <p>Username: {props.usr.username}</p>
                        <p>Email: {props.usr.email}</p>
                        <p>Address: {props.usr.address}</p>
                        <p>ID: {props.usr.id}</p>
                        <p>Admin: {props.usr.is_admin == true ? 'Y' : 'N'}</p>
                    </div>
                </div>
            )}
        </div>
    );
}
