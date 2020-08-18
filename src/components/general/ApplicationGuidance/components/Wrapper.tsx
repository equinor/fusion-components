import React from 'react';
import {
    AppGuideWrapperElement,
    AppGuideWrapperElementProps,
} from '../../../../customElements/components/app-guide/wrapper';

export type ApplicationGuidanceWrapperProps = React.PropsWithChildren<AppGuideWrapperElementProps>;

declare global {
    namespace JSX {
        interface ReactHTML {
            'fusion-app-guide-wrapper': React.DetailedHTMLFactory<
                ApplicationGuidanceWrapperProps,
                AppGuideWrapperElement
            >;
        }
        interface IntrinsicElements {
            'fusion-app-guide-wrapper': React.DetailedHTMLProps<
                ApplicationGuidanceWrapperProps,
                AppGuideWrapperElement
            >;
        }
    }
}

export const ApplicationGuidanceWrapper: React.FC<ApplicationGuidanceWrapperProps> = (
    props: ApplicationGuidanceWrapperProps
) => {
    return <fusion-app-guide-wrapper {...props}></fusion-app-guide-wrapper>;
};

export default ApplicationGuidanceWrapper;
