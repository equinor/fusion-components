import { useRef, useEffect, FC } from 'react';
import {
    ApplicationGuideElement,
    ApplicationGuideElementProps,
    ApplicationGuideElementTag,
    ApplicationGuideEvent,
    ApplicationGuideEventType,
} from '../../../../customElements/components/application-guide';

export type ApplicationGuidanceWrapperProps = React.PropsWithChildren<
    ApplicationGuideElementProps &
        React.DetailedHTMLProps<
            React.HTMLAttributes<ApplicationGuideElement>,
            ApplicationGuideElement
        > & {
            onOpen?: (e: ApplicationGuideEvent<ApplicationGuideEventType.activated>) => void;
            onClose?: (e: ApplicationGuideEvent<ApplicationGuideEventType.deactivated>) => void;
            onShow?: (e: ApplicationGuideEvent<ApplicationGuideEventType.show>) => void;
        }
>;

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
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

export const ApplicationGuidanceWrapper: FC<ApplicationGuidanceWrapperProps> = (
    args: ApplicationGuidanceWrapperProps
) => {
    const { scope, onOpen, onClose, onShow, ...props } = args;
    const ref = useRef<ApplicationGuideElement>();
    useEffect(() => {
        if (!ref.current) return;
        const el = ref.current;
        el.scope = scope;
        onOpen && el.addEventListener(ApplicationGuideEventType.activated, onOpen);
        onClose && el.addEventListener(ApplicationGuideEventType.deactivated, onClose);
        onShow && el.addEventListener(ApplicationGuideEventType.show, onShow);
        return () => {
            onOpen && el.removeEventListener(ApplicationGuideEventType.activated, onOpen);
            onClose && el.removeEventListener(ApplicationGuideEventType.deactivated, onClose);
            onShow && el.removeEventListener(ApplicationGuideEventType.show, onShow);
        };
    }, [ref]);

    useEffect(() => {
        if (!ref.current) return;
        ref.current.scope = scope;
    }, [ref, scope]);

    return <fusion-application-guide ref={ref} {...props}></fusion-application-guide>;
};

export default ApplicationGuidanceWrapper;
