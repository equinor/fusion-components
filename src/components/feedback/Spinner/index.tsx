import * as React from 'react';
import classNames from 'classnames';
import styles from './styles.less';

type SpinnerProps = {
    floating?: boolean;

    /** Center the spinner */
    centered?: boolean;

    /** Use primary color instead of default */
    primary?: boolean;

    /** Optional title */
    title?: string;

    /** Use small spinner */
    small?: boolean;

    /** Inline the spinner */
    inline?: boolean;

    size?: number;
};

const Spinner: React.FC<SpinnerProps> = ({
    floating,
    centered,
    primary,
    children,
    title,
    small,
    size,
    inline,
    ...props
}) => {
    const containerClassNames = classNames(styles.spinnerContainer, {
        [styles.floatingContainer]: floating,
        [styles.centeredContainer]: centered,
        [styles.inline]: inline,
    });

    const spinnerClassNames = classNames(styles.spinner, {
        [styles.primary]: primary,
        [styles.small]: small,
    });

    if (inline) {
        return (
            <div className={containerClassNames} {...props}>
                <div className={spinnerClassNames}>
                    <svg
                        className={styles.spinnerBox}
                        viewBox="24 24 48 48"
                        style={{ width: size, height: size }}
                    >
                        <circle
                            className={styles.spinnerBorder}
                            cx="48"
                            cy="48"
                            r="20"
                            fill="none"
                            strokeWidth={3}
                            strokeMiterlimit="10"
                        />
                    </svg>
                </div>
            </div>
        );
    }

    return (
        <div className={containerClassNames} {...props}>
            <div className={spinnerClassNames}>
                <svg className={styles.spinnerBox} viewBox="24 24 48 48">
                    <circle
                        className={styles.spinnerBorder}
                        cx="48"
                        cy="48"
                        r="20"
                        fill="none"
                        strokeWidth="3"
                        strokeMiterlimit="10"
                    />
                </svg>
            </div>
            {title ? <h2 className={styles.spinnerTitle}>{title}</h2> : null}
            {React.Children.count(children) > 0 ? <p>{children}</p> : null}
        </div>
    );
};

Spinner.defaultProps = {
    floating: false,
    centered: false,
    primary: false,
    title: '',
    small: false,
    inline: false,
    size: 24,
};

export default Spinner;
