import { useEffect, useState, useReducer, Reducer } from 'react';
import { User } from '../models';
import { fromJSON } from '../utils/JsonUtils';

namespace AnalyticsHooks {
    export function useUsers() {
        const [user, setUser] = useState<Array<User>>([]);

        useEffect(() => {
            let isMounted = true;
            async function fetchUsers() {
                await fetch('http://localhost:9090/users')
                    .then((res) => res.json())
                    .then((data) => data.map((v: any) => fromJSON<User>(v)))
                    .then((list) => {
                        if (isMounted) {
                            setUser(list);
                        }
                    })
                    .catch((err) => []);
            }
            fetchUsers();

            return () => {
                isMounted = false;
            };
        }, []);

        return user;
    }
}

export default AnalyticsHooks;
