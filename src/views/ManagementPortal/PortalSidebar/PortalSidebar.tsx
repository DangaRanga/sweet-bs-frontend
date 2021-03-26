import React, { useState } from 'react';

// CSS imports
import './PortalSidebar.css';

// Image imports

import LongLogo from "../../../assets/CLIENT/Sweet B's Long.png";

function NavSidebar() {
    return (
        <aside id="nav-sidebar">
            <div id="sidebar-header">
                <img src={LongLogo} id="sweetbs-logo" alt="logo" />
            </div>
            <hr className="portal-divider" />
            <ul className="portal-nav-items">
                <li>
                    <img
                        src=""
                        className="portal-nav-icon"
                        onClick={() => {}}
                    />
                    <p>Dashboard</p>
                </li>
                <li>
                    <img
                        src=""
                        className="portal-nav-icon"
                        onClick={() => {}}
                    />
                    <p>Customer Analytics</p>
                </li>
                <li>
                    <img
                        src=""
                        className="portal-nav-icon"
                        onClick={() => {}}
                    />
                    <p>Order Analytics</p>
                </li>
                <li>
                    <img
                        src=""
                        className="portal-nav-icon"
                        onClick={() => {}}
                    />
                    <p>Manage Menu</p>
                </li>
                <li>
                    <img
                        src=""
                        className="portal-nav-icon"
                        onClick={() => {}}
                    />
                    <p>Shopping List</p>
                </li>
            </ul>
            <div className="portal-divider-word">Controls</div>
            <ul id="portal-controls" className="portal-nav-items">
                <li>
                    <img
                        src=""
                        className="portal-nav-icon"
                        onClick={() => {}}
                    />
                    <p>Settings</p>
                </li>
                <li>
                    <img
                        src=""
                        className="portal-nav-icon"
                        onClick={() => {}}
                    />
                    <p>Themes</p>
                </li>
                <li>
                    <img
                        src=""
                        className="portal-nav-icon"
                        onClick={() => {}}
                    />
                    <p>Logout</p>
                </li>
            </ul>
        </aside>
    );
}

export default NavSidebar;
