import { useStyles } from './style';
import { IconButton, ArrowBackIcon, ArrowForwardIcon } from '@equinor/fusion-components';
import StepPane from './StepPane';
import StepContent from './StepContent';
import classNames from 'classnames';
import { useComponentDisplayClassNames } from '@equinor/fusion';
import { useState, useEffect, useCallback, FC, Children, ReactElement } from 'react';

type StepperProps = {
    onChange?: (stepKey: string) => void;
    children: any;
    forceOrder?: boolean;
    activeStepKey: string;
    hideNavButtons?: boolean;
    verticalSteps?: boolean;
};

type StepKey = {
    key: string;
    position: number;
    disabled: boolean;
};

type StepDirection = 'next' | 'prev';

const Stepper: FC<StepperProps> = ({
    children,
    activeStepKey,
    forceOrder,
    onChange,
    hideNavButtons,
    verticalSteps,
}) => {
    const styles = useStyles();
    const [stepKeys, setStepKeys] = useState<StepKey[]>([]);
    const [currentStepKey, setCurrentStepKey] = useState<string | null>(null);
    const [activeStepPosition, setActiveStepPosition] = useState<number | null>(null);

    const [canNext, setCanNext] = useState(true);
    const [canPrev, setCanPrev] = useState(false);

    useEffect(() => {
        const steps: StepKey[] = Children.toArray(children).map((c, i) => ({
            key: (c as ReactElement).props.stepKey,
            position: i + 1,
            disabled: (c as ReactElement).props.disabled,
        }));

        setStepKeys(steps);
    }, [children]);

    useEffect(() => {
        setCurrentStepKey(activeStepKey);
    }, [activeStepKey]);

    useEffect(() => {
        const current = stepKeys.find((sk) => sk.key === currentStepKey);

        if (current) {
            setActiveStepPosition(current.position);

            const next = stepKeys.find((sk) => sk.position === current.position + 1);
            const prev = stepKeys.find((sk) => sk.position === current.position - 1);

            setCanNext(next !== undefined && !next.disabled);
            setCanPrev(prev !== undefined && !prev.disabled);
        }
    }, [stepKeys, currentStepKey]);

    const findStepKey = useCallback(
        (direction: StepDirection) => {
            const current = stepKeys.find((sk) => sk.key === currentStepKey);

            if (!current) {
                return;
            }

            const newPosition = direction === 'next' ? current.position + 1 : current.position - 1;
            const prevOrNext = stepKeys.find((sk) => sk.position === newPosition);
            return prevOrNext;
        },
        [currentStepKey, stepKeys]
    );

    const handleChange = useCallback(
        (stepKey: string) => {
            setCurrentStepKey(stepKey);
            onChange && onChange(stepKey);
        },
        [onChange]
    );

    const handleClickPrev = useCallback(() => {
        const prevKey = findStepKey('prev');
        if (!prevKey) {
            return;
        }

        handleChange(prevKey.key);
    }, [handleChange, findStepKey]);

    const handleClickNext = useCallback(() => {
        const nextKey = findStepKey('next');

        if (!nextKey) {
            return;
        }

        handleChange(nextKey.key);
    }, [handleChange, findStepKey]);

    const stepperContainerClasses = classNames(
        styles.stepperContainer,
        useComponentDisplayClassNames(styles),
        {
            [styles.verticalStepperContainer]: verticalSteps,
        }
    );
    const stepperClasses = classNames(styles.stepper, useComponentDisplayClassNames(styles), {
        [styles.verticalStepper]: verticalSteps,
    });

    return (
        <div className={stepperContainerClasses}>
            <div className={stepperClasses}>
                {!hideNavButtons && (
                    <>
                        <div className={classNames(styles.navigation, styles.prev)}>
                            <IconButton onClick={handleClickPrev} disabled={!canPrev}>
                                <ArrowBackIcon />
                            </IconButton>
                        </div>
                        <div className={classNames(styles.navigation, styles.next)}>
                            <IconButton onClick={handleClickNext} disabled={!canNext}>
                                <ArrowForwardIcon />
                            </IconButton>
                        </div>
                    </>
                )}
                <StepPane
                    forceOrder={forceOrder || false}
                    children={children}
                    activeStepKey={currentStepKey}
                    activeStepPosition={activeStepPosition}
                    onChange={handleChange}
                    verticalSteps={verticalSteps}
                ></StepPane>
            </div>
            <StepContent children={children} activeStepKey={currentStepKey} />
        </div>
    );
};

export default Stepper;
