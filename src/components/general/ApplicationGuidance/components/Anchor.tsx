import React from 'react';
import {
    AnchorDOMRect,
    OverlayAnchorElement,
    OverlayAnchorElementTag,
    OverlayAnchorElementProps,
    OverlayAnchorConnectEvent,
} from '../../../../customElements/components/overlay/anchor';

export interface AppGuideAnchorRef<R extends HTMLElement> {
    id: string;
    scope?: string;
    padding?: number;
    ref: React.RefObject<R>;
}

export const useAnchor = <R extends HTMLElement>(anchor: Omit<AppGuideAnchorRef<R>, 'ref'>) => {
    const ref = React.useRef<R>(null);
    useAnchorRef({ ...anchor, ref });
    return ref;
};

export const useAnchorRef = <R extends HTMLElement>(anchor: AppGuideAnchorRef<R>) => {
    const { id, ref, scope, padding } = anchor;
    const callBackRef = React.useRef<VoidFunction>();
    const anchorPadding = React.useRef<number>(padding);

    React.useEffect(() => {
        if (!ref.current) {
            return;
        }
        requestAnimationFrame(() => {
            const event = new OverlayAnchorConnectEvent({
                detail: {
                    id,
                    scope,
                    bounds: () => {
                        return AnchorDOMRect.create(
                            ref.current.getBoundingClientRect(),
                            anchorPadding.current
                        );
                    },
                    disconnectedCallback: (cb: VoidFunction) => {
                        callBackRef.current = cb;
                    },
                },
                cancelable: false,
                bubbles: true,
                composed: true,
            });
            ref.current.dispatchEvent(event);
        });
        return () => callBackRef.current();
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
