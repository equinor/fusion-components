import { useEffect, EffectCallback } from "react";

export default (
    node: HTMLElement | Window,
    eventType: string,
    handler: EventListener,
    dependencies: any[],
    useCapture: boolean = false
) => {
    useEffect((): EffectCallback => {
        if (!node) {
            return;
        }

        node.addEventListener(eventType, handler, useCapture);

        return () => {
            node.removeEventListener(eventType, handler, useCapture);
        };
    }, dependencies);
};
