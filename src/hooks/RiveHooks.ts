import { useRef } from 'react';
import { useCallback, useState, useEffect } from 'react';

export function useRiveRef() {
    const [isLoaded, setIsLoaded] = useState<boolean>(false);

    const ref = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        console.log("hi");
        
        if (ref.current !== null) {
            if (!isLoaded) {
                setIsLoaded(true);
            }
        }
    });

    
    return <const>[isLoaded, ref];
}
