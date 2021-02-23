import { useEffect } from 'react';

export default <T extends EventListenerOrEventListenerObject>(
    node: HTMLElement | Window | null,
    eventType: string,
    handler: T,
    dependencies: any[],
    useCapture = false
) => {
    useEffect(() => {
        if (node == null) {
            return;
        }

        node.addEventListener(eventType, handler, useCapture);

        return () => {
            node.removeEventListener(eventType, handler, useCapture);
        };
    }, [node, ...dependencies]);
};
