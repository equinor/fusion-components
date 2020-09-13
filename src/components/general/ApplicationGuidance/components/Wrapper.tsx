import React from 'react';
import {
    ApplicationGuideElement,
    ApplicationGuideElementProps,
    ApplicationGuideElementTag,
} from '../../../../customElements/components/application-guide';

export type ApplicationGuidanceWrapperProps = React.PropsWithChildren<
    ApplicationGuideElementProps &
    React.DetailedHTMLProps<React.HTMLAttributes<ApplicationGuideElement>, ApplicationGuideElement>
>;

declare global {
    namespace JSX {
        interface ReactHTML {
            [ApplicationGuideElementTag]: React.DetailedHTMLFactory<
                ApplicationGuidanceWrapperProps,
                ApplicationGuideElement
            >;
        }
        interface IntrinsicElements {
            [ApplicationGuideElementTag]: React.DetailedHTMLProps<
                ApplicationGuidanceWrapperProps,
                ApplicationGuideElement
            >;
        }
    }
}

export const ApplicationGuidanceWrapper: React.FC<ApplicationGuidanceWrapperProps> = (
    props: ApplicationGuidanceWrapperProps
) => {
    return <fusion-application-guide {...props}></fusion-application-guide>;
};

export default ApplicationGuidanceWrapper;
