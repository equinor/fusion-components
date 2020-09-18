import React from 'react';
import {
    AppGuideAnchorElement,
    AppGuideAnchorElementProps,
    QuickFactToggleEventData,
} from '../../../../customElements/components/app-guide/anchor';

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

export default ApplicationGuidanceAnchor;
