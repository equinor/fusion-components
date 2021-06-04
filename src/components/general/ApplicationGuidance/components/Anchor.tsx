import {
    useRef,
    useEffect,
    FC,
    RefObject,
    DetailedHTMLFactory,
    DetailedHTMLProps,
    HTMLAttributes,
    PropsWithChildren,
} from 'react';
import {
    AnchorDOMRect,
    OverlayAnchorElement,
    OverlayAnchorElementTag,
    OverlayAnchorElementProps,
    OverlayAnchorConnectEvent,
} from '../../../../customElements/components/overlay/anchor';

export interface AppGuideAnchorRef<R extends HTMLElement> {
    /**
     * unique key for the app (within its scope)
     */
    id: string;

    /**
     * scope of the anchor, sub-scopes are divided by `|`
     */
    scope: string;

    /**
     * amount of padding added to the calculation of element bounds
     */
    padding?: number;

    /**
     * reference to the element [HTMLElement] which displays the anchor
     */
    ref: RefObject<R>;

    onSelected?: () => void;
}

/**
 * @see useAnchorRef
 *
 * Creates and ref for [useAnchorRef]
 *
 * @param anchor anchor props
 * @returns [ useRef<R>]
 */
export const useAnchor = <R extends HTMLElement>(anchor: Omit<AppGuideAnchorRef<R>, 'ref'>) => {
    const ref = useRef<R>(null);
    useAnchorRef({ ...anchor, ref });
    return ref;
};

/**
 *
 * Hook for binding an element to a anchor.
 * When the element attaches to the dom an event is fired for registering the element to the overlay.
 * The event contains a callback for disconnecting from the over, which is called on un-mount
 * The event also contain a callback for calculating the bounds of the element and applies provided padding.
 *
 * The element must be within a [ApplicationGuidanceWrapper]
 *
 * @param anchor [AppGuideAnchorRef]
 * @returns [ useRef<R>]
 */
export const useAnchorRef = <R extends HTMLElement>(anchor: AppGuideAnchorRef<R>) => {
    const { id, ref, scope, onSelected } = anchor;
    const callBackRef = useRef<VoidFunction>();
    const padding = useRef<number>(anchor.padding);

    useEffect(() => {
        requestAnimationFrame(() => {
            if (!ref.current || !scope) {
                ref.current && !scope && console.warn('no scope defined');
                return;
            }
            const event = new OverlayAnchorConnectEvent({
                detail: {
                    anchor: id,
                    scope,
                    bounds: () => {
                        return AnchorDOMRect.create(
                            ref.current.getBoundingClientRect(),
                            padding.current
                        );
                    },
                    disconnectedCallback: (cb: VoidFunction) => {
                        callBackRef.current = cb;
                    },
                    selected: onSelected,
                },
                cancelable: false,
                // allow propagation threw shadow doms
                bubbles: true,
                composed: true,
            });
            ref.current.dispatchEvent(event);
        });
        return () => callBackRef.current && callBackRef.current();
    }, [ref]);
};

export type ApplicationGuidanceAnchorProps = PropsWithChildren<
    Omit<OverlayAnchorElementProps, 'bounds'> &
        DetailedHTMLProps<HTMLAttributes<OverlayAnchorElement>, OverlayAnchorElement>
>;

export const ApplicationGuidanceAnchor: FC<ApplicationGuidanceAnchorProps> = (
    props: ApplicationGuidanceAnchorProps
) => {
    return <fusion-overlay-anchor {...props}></fusion-overlay-anchor>;
};

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace JSX {
        interface ReactHTML {
            [OverlayAnchorElementTag]: DetailedHTMLFactory<
                ApplicationGuidanceAnchorProps,
                OverlayAnchorElement
            >;
        }
        interface IntrinsicElements {
            [OverlayAnchorElementTag]: DetailedHTMLProps<
                ApplicationGuidanceAnchorProps,
                OverlayAnchorElement
            >;
        }
    }
}

export default ApplicationGuidanceAnchor;
