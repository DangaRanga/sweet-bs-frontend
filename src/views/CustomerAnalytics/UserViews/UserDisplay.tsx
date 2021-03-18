import '../CustomerAnalytics.css';
import { User } from '../../../models';

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
            {props.user.is_admin == true ? (
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
                            {props.user.firstname + ' ' + props.user.lastname}
                        </p>
                        <p>{props.user.address}</p>
                        <p>30</p>
                    </div>
                    <hr />
                </div>
            )}
        </div>
    );
}
