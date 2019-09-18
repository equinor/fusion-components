import * as React from 'react';
import * as styles from './styles.less';
import { IconButton, ArrowBackIcon, ArrowForwardIcon } from '@equinor/fusion-components';

type StepperProps = {
    onChange?: (stepKey: string) => void;
    children: any;
    forceOrder: boolean;
    initialStepKey?: string;
};

type StepPaneProps = {
    onChange: (stepKey: string) => void;
    children: any;
    activeStepKey: string;
    activeStepPosition: number;
    forceOrder: boolean;
};

type StepContentProps = {
    children: any;
    activeStepKey: string;
};

type StepKey = {
    key: string;
    position: number;
    disabled: boolean;
};

type StepDirection = 'next' | 'prev';

const StepContent: React.FC<StepContentProps> = ({ children, activeStepKey }) => {
    const active = React.Children.toArray(children).find(
        child => child.props.stepKey === activeStepKey
    );

    if (!active) {
        return null;
    }

    const clonedChildren = React.Children.map(active.props.children, child =>
        React.cloneElement(child)
    );

    return <div>{clonedChildren}</div>;
};

const StepPane: React.FC<StepPaneProps> = ({
    children,
    onChange,
    activeStepKey,
    activeStepPosition,
    forceOrder,
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

        return React.cloneElement(child, {
            onChange: (ref: HTMLElement) => {
                activeStepRef.current = ref;
                onChange(stepKey);
            },
            isCurrent: stepKey === activeStepKey,
            position: index + 1,
            isClickable: !forceOrder,
            done: activeStepPosition > index + 1,
        });
    });

    return (
        <div className={styles.stepPane} ref={stepPaneRef}>
            {clonedChildren}
        </div>
    );
};

const Stepper: React.FC<StepperProps> = ({ children, initialStepKey, forceOrder, onChange }) => {
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
        setActiveStepKey(initialStepKey || steps[0].key);
    }, []);

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

            setCanNext(next !== undefined && !next.disabled);
            setCanPrev(prev !== undefined && !prev.disabled);
        }
    }, [stepKeys, activeStepKey]);

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
                setActiveStepKey(stepKey);
            }
        },
        [forceOrder]
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
                    forceOrder={forceOrder}
                    children={children}
                    activeStepKey={activeStepKey}
                    activeStepPosition={activeStepPosition}
                    onChange={handleChange}
                />
            </div>
            <StepContent children={children} activeStepKey={activeStepKey} />
        </>
    );
};

export default Stepper;
