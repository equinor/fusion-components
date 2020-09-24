import React from 'react';
import {
    AnchorDOMRect,
    OverlayAnchorElement,
    OverlayAnchorElementTag,
    OverlayAnchorElementProps,
    OverlayAnchorConnectEvent
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
    ref: React.RefObject<R>;
}

/**
 * @see useAnchorRef
 * 
 * Creates and ref for [useAnchorRef]
 * 
 * @param anchor anchor props
 * @returns [React.useRef<R>]
 */
export const useAnchor = <R extends HTMLElement>(anchor: Omit<AppGuideAnchorRef<R>, 'ref'>) => {
    const ref = React.useRef<R>(null);
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
 * @returns [React.useRef<R>]
 */
export const useAnchorRef = <R extends HTMLElement>(anchor: AppGuideAnchorRef<R>) => {
    const { id, ref, scope } = anchor;
    const callBackRef = React.useRef<VoidFunction>();
    const padding = React.useRef<number>(anchor.padding);

    React.useEffect(() => {
        requestAnimationFrame(() => {
            if (!ref.current) {
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
                },
                cancelable: false,
                // allow propagation threw shadow doms
                bubbles: true,
                composed: true,
            });
            ref.current.dispatchEvent(event);
        })
        return () => callBackRef.current && callBackRef.current();
    }, [ref]);
};

export type ApplicationGuidanceAnchorProps = React.PropsWithChildren<
    Omit<OverlayAnchorElementProps, 'bounds'> &
    React.DetailedHTMLProps<React.HTMLAttributes<OverlayAnchorElement>, OverlayAnchorElement>
>;

export const ApplicationGuidanceAnchor: React.FC<ApplicationGuidanceAnchorProps> = (
    props: ApplicationGuidanceAnchorProps
) => {
    return <fusion-overlay-anchor {...props}></fusion-overlay-anchor>;
};

declare global {
    namespace JSX {
        interface ReactHTML {
            [OverlayAnchorElementTag]: React.DetailedHTMLFactory<
                ApplicationGuidanceAnchorProps,
                OverlayAnchorElement
            >;
        }
        interface IntrinsicElements {
            [OverlayAnchorElementTag]: React.DetailedHTMLProps<
                ApplicationGuidanceAnchorProps,
                OverlayAnchorElement
            >;
        }
    }
}

export default ApplicationGuidanceAnchor;
