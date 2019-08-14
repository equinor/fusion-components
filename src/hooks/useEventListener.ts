import { useEffect } from 'react';

export default <T extends EventListener>(
    node: HTMLElement | Window | null,
    eventType: string,
    handler: T,
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
