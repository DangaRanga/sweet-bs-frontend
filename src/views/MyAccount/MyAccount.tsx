import { useContext } from 'react';
import { WebsiteNav } from '../../components';
import { Email, Face, Location, Lock } from '../../components/Icons';
import { AppContext } from '../../context';
import './MyAccount.css';

interface MyAccountProps {
}

export default function MyAccount(props: MyAccountProps) {
    var primary = '#9377e2';
    const context = useContext(AppContext);

    return (
        <div id="my-account">
            <WebsiteNav />
            <div className="content">
                <div className="bottom-pane"></div>
                <div className="info">
                    <h1>John Doe</h1>
                    <p className="joined-date">joined Sep 16, 2019</p>
                    <div className="stats">
                        <p className="label-faded">Weekly Stats</p>
                        <div className="stats-inner">
                            <div className="stat-group">
                                <p className="value">2</p>
                                <p className="label">orders pending</p>
                            </div>
                            <div className="separator"></div>
                            <div className="stat-group">
                                <p className="value">1</p>
                                <p className="label">orders complete</p>
                            </div>
                            <div className="separator"></div>
                            <div className="stat-group">
                                <p className="value">6</p>
                                <p className="label">total orders placed</p>
                            </div>
                        </div>
                    </div>
                    <div className="details">
                        <Face fill={primary} />
                        <Email fill={primary} />
                        <Location fill={primary} />
                        <Lock fill={primary} />
                    </div>
                </div>
            </div>
        </div>
    );
}
