// React Imports
import React, { useEffect, useState } from 'react';

import { PortalSidebar } from './PortalSidebar';

// CSS Imports
import './ManagementPortal.css';

interface ManagementPortalProps {
    portalComponent: React.ComponentType;
}

// TODO - Create a protected route to only allow this to be rendered for authenticated users
function ManagementPortal({
    portalComponent: PortalComponent,
}: ManagementPortalProps) {
    return (
        <div id="portal-nav">
            <PortalSidebar></PortalSidebar>
            <main>
                <nav>
                    <div id="nav-icon"></div>
                    <div id="icon-text"> John Brown </div>
                </nav>
                <PortalComponent></PortalComponent>
            </main>
        </div>
    );
}

export default ManagementPortal;
