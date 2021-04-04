import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from "../../assets/CLIENT/Sweet B's Long.png";
import './WebsiteNav.css';
import { Icons } from '..';
import { AppContext } from '../../context';

interface WebsiteNavProps {}

export default function WebsiteNav(props: WebsiteNavProps) {
    // needed for hiding/showing the drop down for the account navigation links
    const [showDropdown, setShowDropdown] = useState<'hidden' | undefined>(
        'hidden'
    );

    const context = useContext(AppContext);

    return (
        <nav>
            <div id="main-nav">
                <img src={logo} alt="SweetB's logo" />
                <div className="right">
                    <Link id="menu-link" to="/menu">
                        Menu
                    </Link>
                    <Link id="cart-link" to="/cart">
                        <button className="btn primary filled">
                            <Icons.ShoppingCartHollow fill="white" />
                            <div className="circle">{context.cart.length}</div>
                        </button>
                    </Link>
                    <div id="account-dropdown-section">
                        <button
                            id="accounts"
                            className="btn primary icon filled"
                            onClick={(e) => {
                                if (showDropdown) {
                                    setShowDropdown(undefined);
                                } else {
                                    setShowDropdown('hidden');
                                }
                            }}
                        >
                            <Icons.PersonCircleInverted fill="white" />
                        </button>
                        <div id="account-dropdown" className={showDropdown}>
                            <Link to="/signup">Sign Up</Link>
                            <hr />
                            <Link to="/login">Login</Link>
                            {context.jwt.token && <hr />}
                            {context.jwt.token && (
                                <Link to="/profile">My Profile</Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
