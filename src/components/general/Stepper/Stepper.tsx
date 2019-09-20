import * as React from 'react';
import * as styles from './styles.less';
import { IconButton, ArrowBackIcon, ArrowForwardIcon } from '@equinor/fusion-components';
import StepPane from './StepPane';
import StepContent from './StepContent';

type StepperProps = {
    onChange?: (stepKey: string) => void;
    children: any;
    forceOrder?: boolean;
    startStep?: number;
    maxStep?: number;
};

type StepKey = {
    key: string;
    position: number;
    disabled: boolean;
};

type StepDirection = 'next' | 'prev';

const Stepper: React.FC<StepperProps> = ({
    children,
    startStep,
    forceOrder,
    onChange,
    maxStep,
}) => {
    const [stepKeys, setStepKeys] = React.useState<StepKey[]>([]);
    const [activeStepKey, setActiveStepKey] = React.useState();
    const [activeStepPosition, setActiveStepPosition] = React.useState();

    const [canNext, setCanNext] = React.useState(true);
    const [canPrev, setCanPrev] = React.useState(false);

    React.useEffect(() => {
        const steps: StepKey[] = React.Children.toArray(children).map((c, i) => ({
            key: c.props.stepKey,
            position: i + 1,
            disabled: c.props.disabled,
        }));

        setStepKeys(steps);

        const startIndex = startStep && startStep > 0 ? startStep - 1 : 0;

        setActiveStepKey(steps[startIndex].key);
    }, [startStep]);

    React.useEffect(() => {
        if (onChange && activeStepKey) {
            onChange(activeStepKey);
        }
    }, [onChange, activeStepKey]);

    React.useEffect(() => {
        const current = stepKeys.find(sk => sk.key === activeStepKey);

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
    }, [stepKeys, activeStepKey, maxStep]);

    const findStepKey = React.useCallback(
        (direction: StepDirection) => {
            const current = stepKeys.find(sk => sk.key === activeStepKey);

            if (!current) {
                return;
            }

            const newPosition = direction === 'next' ? current.position + 1 : current.position - 1;
            const prevOrNext = stepKeys.find(sk => sk.position === newPosition);
            return prevOrNext;
        },
        [activeStepKey, stepKeys]
    );

    const handleClickPrev = React.useCallback(() => {
        const prevKey = findStepKey('prev');
        if (!prevKey) {
            return;
        }

        setActiveStepKey(prevKey.key);
    }, [activeStepKey, stepKeys]);

    const handleClickNext = React.useCallback(() => {
        const nextKey = findStepKey('next');

        if (!nextKey) {
            return;
        }

        setActiveStepKey(nextKey.key);
    }, [activeStepKey, stepKeys]);

    const handleChange = React.useCallback(
        (stepKey: string) => {
            if (!forceOrder) {
                const newStep = stepKeys.find(s => s.key === stepKey);

                if (newStep && maxStep && newStep.position > maxStep) {
                    return;
                }

                setActiveStepKey(stepKey);
            }
        },
        [forceOrder, maxStep, stepKeys]
    );

    return (
        <>
            <div className={styles.stepper}>
                <IconButton onClick={handleClickPrev} disabled={!canPrev}>
                    <ArrowBackIcon />
                </IconButton>
                <IconButton onClick={handleClickNext} disabled={!canNext}>
                    <ArrowForwardIcon />
                </IconButton>
                <StepPane
                    forceOrder={forceOrder || false}
                    children={children}
                    activeStepKey={activeStepKey}
                    activeStepPosition={activeStepPosition}
                    onChange={handleChange}
                    maxStep={maxStep}
                />
            </div>
            <StepContent children={children} activeStepKey={activeStepKey} />
        </>
    );
};

export default Stepper;
