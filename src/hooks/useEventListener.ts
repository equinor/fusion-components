import { useEffect } from 'react';

export default <T extends EventListenerOrEventListenerObject>(
    node: HTMLElement | Window | null,
    eventType: string,
    handler: T,
    dependencies: any[],
    options?: boolean | AddEventListenerOptions
): void => {
    useEffect(() => {
        if (node == null) {
            return;
        }

        node.addEventListener(eventType, handler, options);

        return () => {
            node.removeEventListener(eventType, handler, options);
        };
    }, [node, ...dependencies]);
};
