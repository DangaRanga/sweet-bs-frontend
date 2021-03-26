import '../CustomerAnalytics.css';
import { User } from '../../../models';
import remove from '../../../assets/icons/person_remove_black_24dp.svg';
import viewOrders from '../../../assets/icons/view_list_black_24dp.svg';

interface UserDetailsProps {
    usr: User;
}

export default function UserDetails(props: UserDetailsProps) {
    async function postData(event: any) {
        event.preventDefault();

        await fetch('http://localhost:9090/users/remove', {
            method: 'POST',
            body: JSON.stringify({ id: props.usr.id }),
        })
            .then((res) => res.json())
            .then((data) => console.log(data))
            .catch((err) => console.log(err));
    }

    return (
        <div className="details">
            {props.usr === undefined ? (
                <div></div>
            ) : (
                <div>
                    <h2>Detailed Information</h2>
                    <hr />
                    <div className="detailed-info">
                        <p>
                            Name:{' '}
                            <strong>
                                {props.usr.firstname + ' ' + props.usr.lastname}
                            </strong>
                        </p>
                        <p>Username: {props.usr.username}</p>
                        <p>Email: {props.usr.email}</p>
                        <p>Address: {props.usr.address}</p>
                        <p>ID: {props.usr.id}</p>
                        <p>Total Orders: 30</p>
                    </div>
                    <div className="detail-btns">
                        <p className="details-btn">
                            <img src={viewOrders} alt="View Orders" />
                            View Orders
                        </p>
                        <form id="post-data">
                            <p
                                className="details-btn"
                                onClick={(e) => {
                                    postData(e);
                                }}
                            >
                                <img src={remove} alt="Remove Customer" />
                                Remove User
                            </p>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
