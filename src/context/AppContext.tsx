import { createContext } from 'react';
import { AppData } from '../models';

function AppContextCreator() {
    // assign garbage values for now
    const AppContext = createContext<AppData.AppState>({
        cart: [],
        jwt: { token: null },
        updateCart: (v) => {},
        updateJWT: (v) => '' as any,
    });

    return AppContext;
}

const AppContext = AppContextCreator();

export default AppContext;
