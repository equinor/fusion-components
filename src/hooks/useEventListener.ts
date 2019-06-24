import { useEffect } from 'react';

export default (
    node: HTMLElement | Window | null,
    eventType: string,
    handler: EventListener,
    dependencies: any[],
    useCapture: boolean = false
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
