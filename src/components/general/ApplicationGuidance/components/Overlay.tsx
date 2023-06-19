import {
    DetailedHTMLFactory,
    DetailedHTMLProps,
    FC,
    HTMLAttributes,
    PropsWithChildren,
    useEffect,
    useRef,
} from 'react';

import {
    OverlayElement,
    OverlayElementProps,
    OverlayElementTag,
    OverlayEvent,
    OverlayEventType,
} from '../../../../customElements/components/overlay';

export type OverlayProps = PropsWithChildren<
    OverlayElementProps &
        DetailedHTMLProps<HTMLAttributes<OverlayElement>, OverlayElement> & {
            onSelection?: (e: OverlayEvent<OverlayEventType.selection>) => void;
            onScope?: (e: OverlayEvent<OverlayEventType.scope>) => void;
        }
>;

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace JSX {
        interface ReactHTML {
            [OverlayElementTag]: DetailedHTMLFactory<OverlayProps, OverlayElement>;
        }
        interface IntrinsicElements {
            [OverlayElementTag]: DetailedHTMLProps<OverlayProps, OverlayElement>;
        }
    }
}

export const Overlay: FC<OverlayProps> = (args: OverlayProps) => {
    const { scope, onSelection, onScope, ...props } = args;
    const ref = useRef<OverlayElement>();
    useEffect(() => {
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

    useEffect(() => {
        if (!ref.current) return;
        ref.current.scope = scope;
    }, [ref, scope]);

    return <fusion-overlay ref={ref} {...props}></fusion-overlay>;
};

export default Overlay;
