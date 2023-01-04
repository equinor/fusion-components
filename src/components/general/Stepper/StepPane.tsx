import { useStyles } from './style';
import { styling } from '@equinor/fusion-components';
import useWindowWidth from './useWindowWidth';
import classNames from 'classnames';
import { useComponentDisplayClassNames } from '@equinor/fusion';
import { cloneElement, useEffect, useRef, Children, FC } from 'react';

type StepPaneProps = {
    onChange: (stepKey: string) => void;
    children: any;
    activeStepKey: string;
    activeStepPosition: number;
    forceOrder: boolean;
    verticalSteps?: boolean;
};

const StepPane: FC<StepPaneProps> = ({
    children,
    onChange,
    activeStepKey,
    activeStepPosition,
    forceOrder,
    verticalSteps,
}) => {
    const styles = useStyles();
    const stepPaneRef = useRef<HTMLDivElement | null>(null);

    const windowWidth = useWindowWidth();

    const clonedChildren = Children.map(children, (child, index) => {
        const { title, stepKey, disabled } = child.props;

        if (!title || !stepKey) {
            return null;
        }

        const mobileMaxWidth = styling.mobileWidth();

        if (
            !verticalSteps &&
            !(stepKey === activeStepKey) &&
            parseInt(mobileMaxWidth) > windowWidth
        ) {
            return null;
        }

        const position = index + 1;

        return cloneElement(child, {
            onChange: () => onChange(stepKey),
            isCurrent: stepKey === activeStepKey,
            position,
            isClickable: !forceOrder,
            done: activeStepPosition > position,
            disabled: disabled === true,
            isLastStep: index === children.length - 1,
            stepCount: children.length,
            verticalStep: verticalSteps,
            stepPaneRef: stepPaneRef,
        });
    });

    const stepPaneClasses = classNames(styles.stepPane, useComponentDisplayClassNames(styles), {
        [styles.verticalSteps]: verticalSteps,
    });

    return (
        <div className={classNames(styles.stepPaneWrapper)} ref={stepPaneRef}>
            <div className={stepPaneClasses}>{clonedChildren}</div>
        </div>
    );
};

export default StepPane;
