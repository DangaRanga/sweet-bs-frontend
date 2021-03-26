import { useEffect, useState } from 'react';
import { Ingredient } from '../models';
import { fromJSON } from '../utils/JsonUtils';
import { io } from 'socket.io-client';

namespace IngredientsHooks {
    export function useIngredients() {
        const [ingredients, setIngredients] = useState<Array<Ingredient>>([]);

        useEffect(() => {
            let isMounted = true;

            const socket = io('http://localhost:9090/ingredients/watch');

            async function fetchIngredients() {
                socket.connect();
                // whenever the server sends a new list of menu items update the ui
                socket.on('changed:ingredients', (...data: any[][]) => {
                    if (isMounted) {
                        var list = data[0]
                            .map((v: any) => fromJSON<Ingredient>(v))
                            .filter((item) => item !== null) as Ingredient[];
                        setIngredients(list);
                    }
                });

                socket.on('error', (...error) => {
                    // TODO handle error
                });
            }
            fetchIngredients();

            return () => {
                isMounted = false;
                socket.disconnect();
            };
        }, []);

        return ingredients;
    }
}

export default IngredientsHooks;
