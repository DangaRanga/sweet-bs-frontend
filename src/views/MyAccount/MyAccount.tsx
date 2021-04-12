import moment from 'moment';
import { useContext } from 'react';
import { WebsiteNav } from '../../components';
import {
    EditOutline,
    Email,
    Face,
    Location,
    Lock,
    CheckCircle,
    Cancel,
} from '../../components/Icons';
import { AppContext } from '../../context';
import { MyAccountHooks } from '../../hooks';
import './MyAccount.css';

/**
 * A view to allow the user to view and update their account information
 * @returns the myaccount component
 */
export default function MyAccount() {
    //colours for the icons
    var primary = '#9377e2';
    var placeholder = '#C7C7C7';
    var success = '#3abc41';
    var danger = '#ff3a54';
    //states
    const context = useContext(AppContext);

    // allows the user to update parts of their profile
    const [profile, updateProfile] = MyAccountHooks.useProfile(context.jwt);
    // allows toggle on and off edit mode for the account fields
    const [toggleEdit, updateToggleEdit] = MyAccountHooks.useToggleEdit();

    return (
        <div id="my-account">
            <WebsiteNav />
            <div className="content">
                <div className="bottom-pane"></div>
                <div className="info">
                    <h1>{profile.firstname + ' ' + profile.lastname}</h1>
                    <p className="joined-date">
                        joined{' '}
                        {moment(profile.created_on).format('MMM D, YYYY')}
                    </p>
                    {/* Display stats for the user */}
                    <div className="stats">
                        <p className="label-faded">Weekly Stats</p>
                        <div className="stats-inner">
                            <div className="stat-group">
                                <p className="value">
                                    {profile?.orders?.filter(
                                        (order) => !order.complete
                                    ).length ?? 0}
                                </p>
                                <p className="label">orders pending</p>
                            </div>
                            <div className="separator"></div>
                            <div className="stat-group">
                                <p className="value">
                                    {profile?.orders?.filter(
                                        (order) => order.complete
                                    ).length ?? 0}
                                </p>
                                <p className="label">orders complete</p>
                            </div>
                            <div className="separator"></div>
                            <div className="stat-group">
                                <p className="value">{profile.orders_placed}</p>
                                <p className="label">total orders placed</p>
                            </div>
                        </div>
                    </div>
                    <div className="details">
                        <Face fill={primary} />
                        <span
                            onClick={() =>
                                updateToggleEdit({ firstnameReadOnly: false })
                            }
                        >
                            <EditOutline fill={placeholder} />
                        </span>
                        <input
                            type="text"
                            id="firstname"
                            value={profile.firstname}
                            readOnly={toggleEdit.firstnameReadOnly}
                            onChange={(e) =>
                                updateProfile({ firstname: e.target.value })
                            }
                        />
                        {!toggleEdit.firstnameReadOnly && (
                            <span
                                onClick={() => {
                                    MyAccountHooks.updateUserInDb(
                                        {
                                            firstname: profile.firstname as string,
                                        },
                                        context.jwt
                                    );
                                    updateToggleEdit({
                                        firstnameReadOnly: true,
                                    });
                                }}
                            >
                                <CheckCircle fill={success} />
                            </span>
                        )}
                        {!toggleEdit.firstnameReadOnly && (
                            <span
                                onClick={() => {
                                    MyAccountHooks.getUserInDb(
                                        updateProfile,
                                        context.jwt
                                    );
                                    updateToggleEdit({
                                        firstnameReadOnly: true,
                                    });
                                }}
                            >
                                <Cancel fill={danger} />
                            </span>
                        )}
                        {toggleEdit.firstnameReadOnly && <p></p>}
                        {toggleEdit.firstnameReadOnly && <p></p>}

                        <p></p>
                        <span
                            onClick={() =>
                                updateToggleEdit({ lastnameReadOnly: false })
                            }
                        >
                            <EditOutline fill={placeholder} />
                        </span>
                        <input
                            type="text"
                            id="lastname"
                            value={profile.lastname}
                            readOnly={toggleEdit.lastnameReadOnly}
                            onChange={(e) =>
                                updateProfile({ lastname: e.target.value })
                            }
                        />

                        {!toggleEdit.lastnameReadOnly && (
                            <span
                                onClick={() => {
                                    MyAccountHooks.updateUserInDb(
                                        {
                                            lastname: profile.lastname as string,
                                        },
                                        context.jwt
                                    );
                                    updateToggleEdit({
                                        lastnameReadOnly: true,
                                    });
                                }}
                            >
                                <CheckCircle fill={success} />
                            </span>
                        )}
                        {!toggleEdit.lastnameReadOnly && (
                            <span
                                onClick={() => {
                                    MyAccountHooks.getUserInDb(
                                        updateProfile,
                                        context.jwt
                                    );
                                    updateToggleEdit({
                                        lastnameReadOnly: true,
                                    });
                                }}
                            >
                                <Cancel fill={danger} />
                            </span>
                        )}
                        {toggleEdit.lastnameReadOnly && <p></p>}
                        {toggleEdit.lastnameReadOnly && <p></p>}
                        <Email fill={primary} />
                        <span
                            onClick={() =>
                                updateToggleEdit({ emailReadOnly: false })
                            }
                        >
                            <EditOutline fill={placeholder} />
                        </span>
                        <input
                            type="email"
                            id="email"
                            value={profile.email}
                            readOnly={toggleEdit.emailReadOnly}
                            onChange={(e) =>
                                updateProfile({ email: e.target.value })
                            }
                        />

                        {!toggleEdit.emailReadOnly && (
                            <span>
                                <CheckCircle fill={success} />
                            </span>
                        )}
                        {!toggleEdit.emailReadOnly && (
                            <span
                                onClick={() => {
                                    MyAccountHooks.getUserInDb(
                                        updateProfile,
                                        context.jwt
                                    );
                                    updateToggleEdit({
                                        emailReadOnly: true,
                                    });
                                }}
                            >
                                <Cancel fill={danger} />
                            </span>
                        )}
                        {toggleEdit.emailReadOnly && <p></p>}
                        {toggleEdit.emailReadOnly && <p></p>}
                        <Location fill={primary} />
                        <span
                            onClick={() =>
                                updateToggleEdit({ addressReadOnly: false })
                            }
                        >
                            <EditOutline fill={placeholder} />
                        </span>
                        <textarea
                            id="address"
                            value={profile.address}
                            readOnly={toggleEdit.addressReadOnly}
                            onChange={(e) =>
                                updateProfile({ address: e.target.value })
                            }
                        />
                        {!toggleEdit.addressReadOnly && (
                            <span>
                                <CheckCircle fill={success} />
                            </span>
                        )}
                        {!toggleEdit.addressReadOnly && (
                            <span
                                onClick={() => {
                                    MyAccountHooks.getUserInDb(
                                        updateProfile,
                                        context.jwt
                                    );
                                    updateToggleEdit({
                                        addressReadOnly: true,
                                    });
                                }}
                            >
                                <Cancel fill={danger} />
                            </span>
                        )}
                        {toggleEdit.addressReadOnly && <p></p>}
                        {toggleEdit.addressReadOnly && <p></p>}
                        <Lock fill={primary} />
                        <span
                            onClick={() => {
                                updateProfile({ password: '' });

                                updateToggleEdit({ passwordReadOnly: false });
                            }}
                        >
                            <EditOutline fill={placeholder} />
                        </span>
                        <input
                            type="password"
                            id="password"
                            value={profile.password}
                            readOnly={toggleEdit.passwordReadOnly}
                            onChange={(e) =>
                                updateProfile({ password: e.target.value })
                            }
                        />
                        {
                            {
                                /* When the field is in edit mode show cancel and confirm buttons */
                            }
                        }
                        {!toggleEdit.passwordReadOnly && (
                            <span>
                                <CheckCircle fill={success} />
                            </span>
                        )}
                        {!toggleEdit.passwordReadOnly && (
                            <span
                                onClick={() => {
                                    MyAccountHooks.getUserInDb(
                                        updateProfile,
                                        context.jwt
                                    );
                                    updateToggleEdit({
                                        passwordReadOnly: true,
                                    });
                                }}
                            >
                                <Cancel fill={danger} />
                            </span>
                        )}
                        {/*placeholders when the buttons are deactivated */}
                        {toggleEdit.passwordReadOnly && <p></p>}
                        {toggleEdit.passwordReadOnly && <p></p>}
                    </div>
                </div>
            </div>
        </div>
    );
}
