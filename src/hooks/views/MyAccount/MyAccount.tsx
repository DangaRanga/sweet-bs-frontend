import { WebsiteNav } from '../../components';
import './MyAccount.css';

interface MyAccountProps {}

interface MyAccountState {}

export default function MyAccount(props: MyAccountProps) {
    return (
        <div id="my-account">
            <WebsiteNav />
            <div className="content">
                <h1 className="name">John Doe</h1>
                <div className="accent">
                    <div className="stats-container">
                        <p>Weekly Stats</p>
                        <div className="stats">
                            <p className="stat"></p>
                            <p className="label"></p>
                            <div className="separator"></div>
                            <p className="stat"></p>
                            <p className="label"></p>
                            <div className="separator"></div>
                            <p className="stat"></p>
                            <p className="label"></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
