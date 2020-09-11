import React from 'react';
import {
    AppGuideAnchorElement,
    AppGuideAnchorElementProps,
    QuickFactToggleEventData,
    AppGuideAnchorConnectEvent,
    getElementsBounds,
} from '../../../../customElements/components/app-guide/anchor';

export interface AppGuideAnchorRef<R extends HTMLElement> {
    id: string;
    scope: string;
    ref: React.RefObject<R>;
}

export type ApplicationGuidanceAnchorProps = React.PropsWithChildren<AppGuideAnchorElementProps>;

declare global {
    namespace JSX {
        interface ReactHTML {
            'fusion-app-guide-anchor': React.DetailedHTMLFactory<
                ApplicationGuidanceAnchorProps,
                AppGuideAnchorElement
            >;
        }
        interface IntrinsicElements {
            'fusion-app-guide-anchor': React.DetailedHTMLProps<
                ApplicationGuidanceAnchorProps,
                AppGuideAnchorElement
            >;
        }
    }
}

export const ApplicationGuidanceAnchor: React.FC<ApplicationGuidanceAnchorProps> = (
    props: ApplicationGuidanceAnchorProps
) => {
    return <fusion-app-guide-anchor {...props}></fusion-app-guide-anchor>;
};

export const useOnAnchorToggle = (callback: (isActive: boolean) => void) => {
    const ref = React.useRef<AppGuideAnchorElement>(null);

    const handleOnToggle = React.useCallback(
        (e: CustomEvent<QuickFactToggleEventData>) => {
            callback(e.detail.isActive);
        },
        [callback]
    );

    React.useEffect(() => {
        if (ref.current) {
            ref.current.addEventListener('toggle', handleOnToggle);

            return () => ref.current.removeEventListener('toggle', handleOnToggle);
        }
    }, [ref.current]);

    return ref;
};

export const useAnchorRef = <R extends HTMLElement>(anchor: AppGuideAnchorRef<R>) => {

    const {ref, scope, id} = anchor;
    const callBackRef = React.useRef<VoidFunction>();

    const disconnectedCallback = React.useCallback((cb: VoidFunction) => {
        callBackRef.current = cb;
    }, []);

    const bounds = React.useCallback(() => {
        const bounds = ref.current ? getElementsBounds([...ref.current.children]) : null;
        bounds.applyPadding(8);
        return bounds;
    }, [ref]);

    React.useEffect(() => {
        if (!ref.current) {
            return;
        }
        const event = new AppGuideAnchorConnectEvent({
            detail: { id, scope, bounds, disconnectedCallback },
            bubbles: true,
            composed: true,
            cancelable: false,
        });
        ref.current.dispatchEvent(event);

        return callBackRef.current;
    }, [ref]);

    return ref;
};

export default ApplicationGuidanceAnchor;
