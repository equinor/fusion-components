import { useEffect, useRef, useState, FC } from 'react';

import { useStyles } from './style';
import classNames from 'classnames';
import { DoneIcon, styling } from '@equinor/fusion-components';
import { useComponentDisplayClassNames } from '@equinor/fusion';
import useWindowWidth from './useWindowWidth';

type StepProps = {
    title: string;
    stepKey: string;
    description?: string;
    disabled?: boolean;
    isCurrent?: boolean;
    position?: number;
    onChange?: (ref: HTMLElement) => void;
    isClickable?: boolean;
    done?: boolean;
    isLastStep?: boolean;
    stepCount?: number;
    verticalStep?: boolean;
};

type BadgeProps = {
    position?: number;
    active?: boolean;
    done?: boolean;
};

const Badge: FC<BadgeProps> = ({ position, active, done }) => {
    const styles = useStyles();
    const badgeClasses = classNames(styles.badge, useComponentDisplayClassNames(styles), {
        [styles.active]: active,
        [styles.done]: done,
    });

    return (
        <div className={badgeClasses}>
            {!done && position}
            {done && <DoneIcon />}
        </div>
    );
};

const Step: FC<StepProps> = ({
    title,
    description,
    isCurrent,
    disabled,
    position,
    onChange,
    isClickable,
    done,
    isLastStep,
    stepCount,
    verticalStep,
}) => {
    const styles = useStyles();
    const stepRef = useRef<HTMLAnchorElement>(null);
    const [showStepCount, setShowStepCount] = useState(false);

    const stepClasses = classNames(styles.step, useComponentDisplayClassNames(styles), {
        [styles.current]: isCurrent,
        [styles.isClickable]: isClickable,
        [styles.disabled]: disabled,
    });

    const titleClasses = classNames(styles.title, useComponentDisplayClassNames(styles), {
        [styles.isLastStep]: isLastStep,
    });

    const windowWidth = useWindowWidth();

    useEffect(() => {
        const mobileMaxWidth = styling.mobileWidth();

        if (!verticalStep && windowWidth < parseInt(mobileMaxWidth) && !showStepCount) {
            setShowStepCount(true);
        } else if (windowWidth > parseInt(mobileMaxWidth) && showStepCount) {
            setShowStepCount(false);
        }
    }, [windowWidth, verticalStep]);

    useEffect(() => {
        if (isCurrent && onChange && stepRef.current) {
            onChange(stepRef.current);
        }
    }, [isCurrent, onChange, stepRef]);

    if (disabled) {
        return (
            <span className={stepClasses}>
                <Badge position={position} active={isCurrent} done={done} />
                <div className={titleClasses}>
                    <span>{title}</span>
                </div>
                <span className={styles.description}>{description}</span>
            </span>
        );
    }

    return (
        <>
            <a
                onClick={() =>
                    !disabled && onChange && stepRef.current && onChange(stepRef.current)
                }
                ref={stepRef}
                className={stepClasses}
            >
                <Badge position={position} active={isCurrent} done={done} />
                <div className={titleClasses}>
                    <span className={styles.text} title={title}>
                        {title}
                    </span>
                    {!verticalStep && <span className={styles.stepperLine} />}
                </div>
                {showStepCount ? (
                    <span className={classNames(styles.progress)}>
                        {position} of {stepCount}
                    </span>
                ) : verticalStep ? (
                    <span className={styles.verticalStepperLine} />
                ) : (
                    <span />
                )}
                <span className={styles.description}>{description}</span>
            </a>
        </>
    );
};

export default Step;
