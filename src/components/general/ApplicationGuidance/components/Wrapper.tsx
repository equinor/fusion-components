import {
    useRef,
    useEffect,
    FC,
    PropsWithChildren,
    DetailedHTMLProps,
    HTMLAttributes,
    DetailedHTMLFactory,
} from 'react';
import {
    ApplicationGuideElement,
    ApplicationGuideElementProps,
    ApplicationGuideElementTag,
    ApplicationGuideEvent,
    ApplicationGuideEventType,
} from '../../../../customElements/components/application-guide';

export type ApplicationGuidanceWrapperProps = PropsWithChildren<
    ApplicationGuideElementProps &
        DetailedHTMLProps<HTMLAttributes<ApplicationGuideElement>, ApplicationGuideElement> & {
            onOpen?: (e: ApplicationGuideEvent<ApplicationGuideEventType.activated>) => void;
            onClose?: (e: ApplicationGuideEvent<ApplicationGuideEventType.deactivated>) => void;
            onShow?: (e: ApplicationGuideEvent<ApplicationGuideEventType.show>) => void;
        }
>;

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace JSX {
        interface ReactHTML {
            [ApplicationGuideElementTag]: DetailedHTMLFactory<
                ApplicationGuidanceWrapperProps,
                ApplicationGuideElement
            >;
        }
        interface IntrinsicElements {
            [ApplicationGuideElementTag]: DetailedHTMLProps<
                ApplicationGuidanceWrapperProps,
                ApplicationGuideElement
            >;
        }
    }
}

export const ApplicationGuidanceWrapper: FC<ApplicationGuidanceWrapperProps> = (
    args: ApplicationGuidanceWrapperProps
) => {
    const { onOpen, onClose, onShow, ...props } = args;
    const ref = useRef<ApplicationGuideElement>();
    useEffect(() => {
        if (!ref.current) return;
        const el = ref.current;
        onOpen && el.addEventListener(ApplicationGuideEventType.activated, onOpen);
        onClose && el.addEventListener(ApplicationGuideEventType.deactivated, onClose);
        onShow && el.addEventListener(ApplicationGuideEventType.show, onShow);
        return () => {
            onOpen && el.removeEventListener(ApplicationGuideEventType.activated, onOpen);
            onClose && el.removeEventListener(ApplicationGuideEventType.deactivated, onClose);
            onShow && el.removeEventListener(ApplicationGuideEventType.show, onShow);
        };
    }, [ref]);

    return <fusion-application-guide ref={ref} {...props}></fusion-application-guide>;
};

export default ApplicationGuidanceWrapper;
