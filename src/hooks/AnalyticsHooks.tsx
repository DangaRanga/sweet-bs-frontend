import { useEffect, useState } from 'react';
import { User } from '../models';
import { fromJSON } from '../utils/JsonUtils';
import { io } from 'socket.io-client';

export function useUsers() {
    const [user, setUser] = useState<Array<User>>([]);

    useEffect(() => {
        let isMounted = true;

        const socket = io('http://localhost:9090/users/watch');

        async function fetchUsers() {
            socket.connect();

            socket.on('changed:users', (...data: any[][]) => {
                if (isMounted) {
                    var list = data[0]
                        .map((v: any) => fromJSON<User>(v))
                        .filter((item) => item !== null) as User[];
                    console.log(list);
                    setUser(list);
                }
            });

            socket.on('error', (...error) => {
                //todo
            });
        }
        fetchUsers();

        return () => {
            isMounted = false;
            socket.disconnect();
        };
    }, []);

    return user;
}
