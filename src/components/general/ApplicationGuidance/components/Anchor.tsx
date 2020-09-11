import React from 'react';
import {
    AppGuideAnchorElement,
    AppGuideAnchorElementProps,
    QuickFactToggleEventData,
    AppGuideAnchorConnectEvent,
    getElementsBounds,
} from '../../../../customElements/components/app-guide/anchor';

export interface AppGuideAnchorRef {
    id: string;
    scope: string;
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

export const useAnchorRef = (anchor: AppGuideAnchorRef) => {
    const ref = React.useRef<HTMLElement | null>(null);
    const callBackRef = React.useRef<VoidFunction>();

    const disconnectedCallback = React.useCallback((cb: VoidFunction) => {
        console.log('connected');
        callBackRef.current = cb;
    }, []);

    const bounds = React.useCallback(() => {
        console.log('bound');
        const bounds = ref.current ? getElementsBounds([...ref.current.children]) : null;
        bounds.applyPadding(8);
        return bounds;
    }, [ref]);

    React.useEffect(() => {
        if (!ref.current) {
            return;
        }
        const event = new AppGuideAnchorConnectEvent({
            detail: { ...anchor, bounds, disconnectedCallback },
            bubbles: true,
            composed: true,
            cancelable: false,
        });
        ref.current.dispatchEvent(event);

        console.log('current', ref.current);

        return callBackRef.current;
    }, [ref]);

    return ref;
};

export default ApplicationGuidanceAnchor;
