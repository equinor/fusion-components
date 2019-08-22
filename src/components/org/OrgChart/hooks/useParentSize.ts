import { useEffect, useState } from 'react';

type Size = {
    height: number;
    width: number;
};

export default (ref?: React.MutableRefObject<SVGElement | null>): [number, number] => {
    const [size, setSize] = useState<Size>({ height: 0, width: 0 });

    const handleResize = () => {
        if (ref && ref.current && ref.current.parentElement) {
            const parent = ref.current.parentElement;
            setSize({ height: parent.offsetHeight, width: parent.offsetWidth });
        }
    };
    useEffect(() => {
        handleResize();
        let timeoutId;
        window.addEventListener('resize', () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(handleResize, 500);
        });

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return [size.height, size.width];
};
