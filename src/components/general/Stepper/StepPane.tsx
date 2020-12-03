import * as styles from './styles.less';
import { styling } from '@equinor/fusion-components';
import useWindowWidth from './useWindowWidth';
import React, { cloneElement, useEffect, useRef } from 'react';

type StepPaneProps = {
    onChange: (stepKey: string) => void;
    children: any;
    activeStepKey: string;
    activeStepPosition: number;
    forceOrder: boolean;
};

const StepPane: React.FC<StepPaneProps> = ({
    children,
    onChange,
    activeStepKey,
    activeStepPosition,
    forceOrder,
}) => {
    const stepPaneRef = useRef<HTMLDivElement | null>(null);
    const activeStepRef = useRef<HTMLElement | null>(null);

    const windowWidth = useWindowWidth();

    const scrollToStep = (stepRef: HTMLElement | null) => {
        if (!stepPaneRef.current || !stepRef) {
            return;
        }

        const pane = stepPaneRef.current;

        if (pane.scrollWidth === pane.offsetWidth) {
            return;
        }

        pane.scrollTo(stepRef.offsetLeft - stepRef.offsetWidth, 0);
    };

    useEffect(() => scrollToStep(activeStepRef.current), [activeStepKey]);

    const clonedChildren = React.Children.map(children, (child, index) => {
        const { title, stepKey, disabled } = child.props;

        if (!title || !stepKey) {
            return null;
        }

        const mobileMaxWidth = styling.mobileWidth();

        if (!(stepKey === activeStepKey) && parseInt(mobileMaxWidth) > windowWidth) {
            return null;
        }

        const position = index + 1;

        return cloneElement(child, {
            onChange: (ref: HTMLElement) => {
                activeStepRef.current = ref;
                onChange(stepKey);
            },
            isCurrent: stepKey === activeStepKey,
            position,
            isClickable: !forceOrder,
            done: activeStepPosition > position,
            disabled: disabled === true,
            isLastStep: index === children.length - 1,
            stepCount: children.length,
        });
    });

    return (
        <div className={styles.stepPaneWrapper} ref={stepPaneRef}>
            <div className={styles.stepPane}>{clonedChildren}</div>
        </div>
    );
};

export default StepPane;
