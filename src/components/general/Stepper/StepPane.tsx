import React, { useEffect, useState } from 'react';
import * as styles from './styles.less';
import { useFusionContext } from '@equinor/fusion';
import { styling } from '@equinor/fusion-components';
import useWindowWidth from './useWindowWidth';

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

    React.useEffect(() => scrollToStep(activeStepRef.current), [activeStepKey]);

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

        return React.cloneElement(child, {
            onChange: (ref: HTMLElement) => {
                activeStepRef.current = ref;
                onChange(stepKey);
            },
            maxStep,
            isCurrent: stepKey === activeStepKey,
            position,
            isClickable: !forceOrder,
            done: activeStepPosition > position,
            disabled: disabled === true || (maxStep && position > maxStep),
            isLastStep: index === children.length - 1,
        });
    });

    return (
        <div className={styles.stepPane} ref={stepPaneRef}>
            {clonedChildren}
        </div>
    );
};

export default StepPane;
