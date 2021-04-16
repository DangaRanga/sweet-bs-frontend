// React Imports
import React, { useEffect, useState, useContext } from 'react';

import { AppContext } from '../../context';
import { checkAuthorization } from '../../hooks/AppHooks';
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
    const context = useContext(AppContext);

    checkAuthorization(context.jwt);
    
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
