import React from 'react';
import {
    OverlayElement,
    OverlayElementProps,
    OverlayElementTag,
    OverlayEvent,
    OverlayEventType,
} from '../../../../customElements/components/overlay';

export type OverlayProps = React.PropsWithChildren<
    OverlayElementProps &
        React.DetailedHTMLProps<React.HTMLAttributes<OverlayElement>, OverlayElement> & {
            onSelection?: (e: OverlayEvent<OverlayEventType.selection>) => void;
            onScope?: (e: OverlayEvent<OverlayEventType.scope>) => void;
        }
>;

declare global {
    namespace JSX {
        interface ReactHTML {
            [OverlayElementTag]: React.DetailedHTMLFactory<OverlayProps, OverlayElement>;
        }
        interface IntrinsicElements {
            [OverlayElementTag]: React.DetailedHTMLProps<OverlayProps, OverlayElement>;
        }
    }
}

export const Overlay: React.FC<OverlayProps> = (args: OverlayProps) => {
    const { scope, onSelection, onScope, ...props } = args;
    const ref = React.useRef<OverlayElement>();
    React.useEffect(() => {
        if (!ref.current) return;
        const el = ref.current;
        el.scope = scope;
        onSelection && el.addEventListener(OverlayEventType.selection, onSelection);
        onScope && el.addEventListener(OverlayEventType.scope, onScope);
        return () => {
            onSelection && el.removeEventListener(OverlayEventType.selection, onSelection);
            onScope && el.removeEventListener(OverlayEventType.scope, onScope);
        };
    }, [ref]);

    React.useEffect(() => {
        if (!ref.current) return;
        ref.current.scope = scope;
    }, [ref, scope]);

    return <fusion-overlay ref={ref} {...props}></fusion-overlay>;
};

export default Overlay;
