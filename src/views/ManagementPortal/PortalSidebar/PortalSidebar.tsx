import React, { useState } from 'react';

// CSS imports
import './PortalSidebar.css';

// Image imports

import LongLogo from "../../../assets/CLIENT/Sweet B's Long.png";

function NavSidebar() {
    return (
        <aside id="nav-sidebar">
            <div id="sidebar-header">
                <img src={LongLogo} id="sweetbs-logo" />
            </div>
            <hr className="portal-divider" />
        </aside>
    );
}

export default NavSidebar;
