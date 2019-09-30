import * as React from 'react';
import * as styles from './styles.less';

type StepPaneProps = {
    onChange: (stepKey: string) => void;
    children: any;
    activeStepKey: string;
    activeStepPosition: number;
    forceOrder: boolean;
    maxStep?: number;
};

const StepPane: React.FC<StepPaneProps> = ({
    children,
    onChange,
    activeStepKey,
    activeStepPosition,
    forceOrder,
    maxStep,
}) => {
    const stepPaneRef = React.useRef<HTMLDivElement | null>(null);
    const activeStepRef = React.useRef<HTMLElement | null>(null);

    const scrollToStep = (stepRef: HTMLElement | null) => {
        if (!stepPaneRef.current || !stepRef) {
            return;
        }

        const pane = stepPaneRef.current;

        if (pane.scrollWidth === pane.offsetWidth) {
            return;
        }

        pane.scrollTo(stepRef.offsetLeft - pane.offsetWidth / 2 + stepRef.offsetWidth / 2, 0);
    };

    React.useEffect(() => scrollToStep(activeStepRef.current), [activeStepKey]);

    const clonedChildren = React.Children.map(children, (child, index) => {
        const { title, stepKey } = child.props;

        if (!title || !stepKey) {
            return null;
        }

        const position = index + 1;

        return React.cloneElement(child, {
            onChange: (ref: HTMLElement) => {
                activeStepRef.current = ref;
                onChange(stepKey);
            },
            isCurrent: stepKey === activeStepKey,
            position,
            isClickable: !forceOrder,
            done: activeStepPosition > position,
            disabled: maxStep && position > maxStep,
        });
    });

    return (
        <div className={styles.stepPane} ref={stepPaneRef}>
            {clonedChildren}
        </div>
    );
};

export default StepPane;
