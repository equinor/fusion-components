import React, { useState, useEffect } from 'react';
import * as styles from './styles.less';
import { useFusionContext } from '@equinor/fusion';
import { IconButton, ArrowBackIcon, ArrowForwardIcon, styling } from '@equinor/fusion-components';
import StepPane from './StepPane';
import StepContent from './StepContent';
import useWindowWidth from './useWindowWidth';

type StepperProps = {
    onChange?: (stepKey: string) => void;
    children: any;
    forceOrder?: boolean;
    activeStepKey: string;
    maxStep?: number;
    hideNavButtons?: boolean;
};

type StepKey = {
    key: string;
    position: number;
    disabled: boolean;
};

type StepDirection = 'next' | 'prev';

const Stepper: React.FC<StepperProps> = ({
    children,
    activeStepKey,
    forceOrder,
    onChange,
    maxStep,
    hideNavButtons,
}) => {
    const [stepKeys, setStepKeys] = React.useState<StepKey[]>([]);
    const [currentStepKey, setCurrentStepKey] = React.useState();
    const [activeStepPosition, setActiveStepPosition] = React.useState();
    const [showSmallScreenStepper, setSmallScreenStepper] = React.useState(false);

    const [canNext, setCanNext] = React.useState(true);
    const [canPrev, setCanPrev] = React.useState(false);

    React.useEffect(() => {
        const steps: StepKey[] = React.Children.toArray(children).map((c, i) => ({
            key: c.props.stepKey,
            position: i + 1,
            disabled: c.props.disabled,
        }));

        setStepKeys(steps);
    }, [children]);

    React.useEffect(() => {
        setCurrentStepKey(activeStepKey);
    }, [activeStepKey]);

    React.useEffect(() => {
        if (onChange && currentStepKey) {
            onChange(currentStepKey);
        }
    }, [onChange, currentStepKey]);

    React.useEffect(() => {
        const current = stepKeys.find(sk => sk.key === currentStepKey);

        if (current) {
            setActiveStepPosition(current.position);

            const next = stepKeys.find(sk => sk.position === current.position + 1);
            const prev = stepKeys.find(sk => sk.position === current.position - 1);

            if (maxStep) {
                setCanNext(next !== undefined && !next.disabled && next.position <= maxStep);
            } else {
                setCanNext(next !== undefined && !next.disabled);
            }

            setCanPrev(prev !== undefined && !prev.disabled);
        }
    }, [stepKeys, currentStepKey, maxStep]);

    const findStepKey = React.useCallback(
        (direction: StepDirection) => {
            const current = stepKeys.find(sk => sk.key === currentStepKey);

            if (!current) {
                return;
            }

            const newPosition = direction === 'next' ? current.position + 1 : current.position - 1;
            const prevOrNext = stepKeys.find(sk => sk.position === newPosition);
            return prevOrNext;
        },
        [currentStepKey, stepKeys]
    );

    const handleClickPrev = React.useCallback(() => {
        const prevKey = findStepKey('prev');
        if (!prevKey) {
            return;
        }

        setCurrentStepKey(prevKey.key);
    }, [currentStepKey, stepKeys]);

    const handleClickNext = React.useCallback(() => {
        const nextKey = findStepKey('next');

        if (!nextKey) {
            return;
        }

        setCurrentStepKey(nextKey.key);
    }, [currentStepKey, stepKeys]);

    const handleChange = React.useCallback(
        (stepKey: string) => {
            if (!forceOrder) {
                const newStep = stepKeys.find(s => s.key === stepKey);

                if (newStep && maxStep && newStep.position > maxStep) {
                    return;
                }

                setCurrentStepKey(stepKey);
            }
        },
        [forceOrder, maxStep, stepKeys]
    );

    const windowWidth = useWindowWidth();

    useEffect(() => {
        const mobileMaxWidth = styling.mobileWidth();

        if (windowWidth < parseInt(mobileMaxWidth) && !showSmallScreenStepper) {
            setSmallScreenStepper(true);
        } else if (windowWidth > parseInt(mobileMaxWidth) && showSmallScreenStepper) {
            setSmallScreenStepper(false);
        }
    }, [windowWidth]);

    return (
        <>
            {showSmallScreenStepper ? (
                <>
                    <div className={styles.stepper}>
                        <div className={styles.navigation}>
                            <IconButton onClick={handleClickPrev} disabled={!canPrev}>
                                <ArrowBackIcon />
                            </IconButton>
                        </div>
                        <StepPane
                            forceOrder={forceOrder || false}
                            children={children}
                            activeStepKey={currentStepKey}
                            activeStepPosition={activeStepPosition}
                            onChange={handleChange}
                            maxStep={maxStep}
                        />
                        <div className={styles.navigation}>
                            <IconButton onClick={handleClickNext} disabled={!canNext}>
                                <ArrowForwardIcon />
                            </IconButton>
                        </div>
                    </div>
                    <StepContent children={children} activeStepKey={currentStepKey} />
                </>
            ) : (
                <>
                    <div className={styles.stepper}>
                        {!hideNavButtons && (
                            <div className={styles.navigation}>
                                <IconButton onClick={handleClickPrev} disabled={!canPrev}>
                                    <ArrowBackIcon />
                                </IconButton>
                                <IconButton onClick={handleClickNext} disabled={!canNext}>
                                    <ArrowForwardIcon />
                                </IconButton>
                            </div>
                        )}
                        <StepPane
                            forceOrder={forceOrder || false}
                            children={children}
                            activeStepKey={currentStepKey}
                            activeStepPosition={activeStepPosition}
                            onChange={handleChange}
                            maxStep={maxStep}
                        />
                    </div>
                    <StepContent children={children} activeStepKey={currentStepKey} />
                </>
            )}
        </>
    );
};

export default Stepper;
