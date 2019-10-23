import React, { useEffect, useState } from 'react';
import * as styles from './styles.less';
import classNames from 'classnames';
import { DoneIcon, styling } from '@equinor/fusion-components';
import { useComponentDisplayClassNames, useFusionContext } from '@equinor/fusion';
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
};

type BadgeProps = {
    position?: number;
    active?: boolean;
    done?: boolean;
};

const Badge: React.FC<BadgeProps> = ({ position, active, done }) => {
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

const Step: React.FC<StepProps> = ({
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
}) => {
    const stepRef = React.useRef<HTMLAnchorElement>(null);
    const [showStepCount, setShowStepCount] = React.useState(false);

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

        if (windowWidth < parseInt(mobileMaxWidth) && !showStepCount) {
            setShowStepCount(true);
        } else if (windowWidth > parseInt(mobileMaxWidth) && showStepCount) {
            setShowStepCount(false);
        }
    }, [windowWidth]);

    React.useEffect(() => {
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
                <div className={styles.badge}>
                    <Badge position={position} active={isCurrent} done={done} />
                </div>
                <div className={titleClasses}>
                    <span>{title}</span>
                    <span className={styles.stepperLine} />
                </div>
                <span className={classNames(styles.progress)}>
                    {position} of {stepCount}
                </span>
                <span className={styles.description}>{description}</span>
            </a>
        </>
    );
};

export default Step;
