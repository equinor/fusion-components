import React from 'react';
import * as styles from './styles.less';
import { IconButton, ArrowBackIcon, ArrowForwardIcon } from '@equinor/fusion-components';
import StepPane from './StepPane';
import StepContent from './StepContent';
import classNames from 'classnames';

type StepperProps = {
    onChange?: (stepKey: string) => void;
    children: any;
    forceOrder?: boolean;
    activeStepKey: string;
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
    hideNavButtons,
}) => {
    const [stepKeys, setStepKeys] = React.useState<StepKey[]>([]);
    const [currentStepKey, setCurrentStepKey] = React.useState<string | null>(null);
    const [activeStepPosition, setActiveStepPosition] = React.useState<number | null>(null);

    const [canNext, setCanNext] = React.useState(true);
    const [canPrev, setCanPrev] = React.useState(false);

    React.useEffect(() => {
        const steps: StepKey[] = React.Children.toArray(children).map((c, i) => ({
            key: (c as React.ReactElement).props.stepKey,
            position: i + 1,
            disabled: (c as React.ReactElement).props.disabled,
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

            setCanNext(next !== undefined && !next.disabled);
            setCanPrev(prev !== undefined && !prev.disabled);
        }
    }, [stepKeys, currentStepKey]);

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
                setCurrentStepKey(stepKey);
            }
        },
        [forceOrder, stepKeys]
    );

    return (
        <>
            <div className={styles.stepper}>
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
                />
            </div>
            <StepContent children={children} activeStepKey={currentStepKey} />
        </>
    );
};

export default Stepper;
