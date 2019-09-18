import * as React from 'react';
import * as styles from './styles.less';
import classNames from 'classnames';
import { DoneIcon } from '@equinor/fusion-components';

type StepProps = {
    title: string;
    stepKey: string;
    disabled?: boolean;
    isCurrent?: boolean;
    position?: number;
    onChange?: (ref: HTMLElement) => void;
    isClickable?: boolean;
    done?: boolean;
};

type BadgeProps = {
    position?: number;
    active?: boolean;
    done?: boolean;
};

const Badge: React.FC<BadgeProps> = ({ position, active, done }) => {
    const badgeClasses = classNames(styles.badge, {
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
    isCurrent,
    disabled,
    position,
    onChange,
    isClickable,
    done,
}) => {
    const stepRef = React.useRef<HTMLAnchorElement>(null);

    const stepClasses = classNames(styles.step, {
        [styles.current]: isCurrent,
        [styles.isClickable]: isClickable,
        [styles.disabled]: disabled,
    });

    const titleClasses = classNames(styles.title);

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
        <a
            onClick={() => !disabled && onChange && stepRef.current && onChange(stepRef.current)}
            ref={stepRef}
            className={stepClasses}
        >
            <Badge position={position} active={isCurrent} done={done} />
            <div className={titleClasses}>
                <span>{title}</span>
            </div>
        </a>
    );
};

export default Step;
