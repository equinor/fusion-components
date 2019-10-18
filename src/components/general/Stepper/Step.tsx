import * as React from 'react';
import * as styles from './styles.less';
import classNames from 'classnames';
import { DoneIcon } from '@equinor/fusion-components';
import { useComponentDisplayClassNames } from '@equinor/fusion';

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
}) => {
    const stepRef = React.useRef<HTMLAnchorElement>(null);

    const stepClasses = classNames(styles.step, useComponentDisplayClassNames(styles), {
        [styles.current]: isCurrent,
        [styles.isClickable]: isClickable,
        [styles.disabled]: disabled,
    });

    const titleClasses = classNames(styles.title, useComponentDisplayClassNames(styles), {
        [styles.isLastStep]: isLastStep,
    });

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
                <div style={{ display: 'flex', flexDirection: 'row', paddingBottom: 8 }}>
                    <Badge position={position} active={isCurrent} done={done} />
                    <div className={titleClasses}>
                        <span>{title}</span>
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <span className={styles.badgeLink}> </span>
                    <span className={styles.description}>{description}</span>
                </div>
            </a>
        </>
    );
};

export default Step;
