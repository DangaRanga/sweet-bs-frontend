import { useRef } from 'react';
import { useState, useEffect } from 'react';

export function useRiveRef() {
    const [isLoaded, setIsLoaded] = useState<boolean>(false);

    const ref = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (ref.current !== null) {
            if (!isLoaded) {
                setIsLoaded(true);
            }
        }
    }, [isLoaded]);


    return ref;
}
