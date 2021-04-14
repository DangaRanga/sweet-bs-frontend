import '../CustomerAnalytics.css';
import { User } from '../../../models';
import face from '../../../assets/icons/person_black_24dp.svg';

interface UserDisplayProps {
    user: User;
    onClickUser(usr: User): any;
}

export default function UserDisplay(props: UserDisplayProps) {
    function handleClick() {
        var usr = props.user;
        props.onClickUser(usr);
    }

    return (
        <div>
            {props.user.is_admin === true ? (
                <div></div>
            ) : (
                <div>
                    <div
                        className="customer-info"
                        onClick={() => {
                            handleClick();
                        }}
                    >
                        <p>
                            <img src={face} alt="placeholder face" />
                            {props.user.firstname + ' ' + props.user.lastname}
                        </p>
                        <p>{props.user.email}</p>
                        <p>{props.user.orders_placed}</p>
                    </div>
                    <hr />
                </div>
            )}
        </div>
    );
}
