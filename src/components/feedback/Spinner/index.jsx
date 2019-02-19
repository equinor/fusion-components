import React, { Children } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import styles from "./styles.less";

const Spinner = ({
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
            {Children.count(children) > 0 ? <p>{children}</p> : null}
        </div>
    );
};

Spinner.propTypes = {
    /** Floats the spinner over content in the container */
    floating: PropTypes.bool,

    /** Center the spinner */
    centered: PropTypes.bool,

    /** Use primary color instead of default */
    primary: PropTypes.bool,

    /** Optional title */
    title: PropTypes.string,

    /** Use small spinner */
    small: PropTypes.bool,

    /** Inline the spinner */
    inline: PropTypes.bool,
};

Spinner.defaultProps = {
    floating: false,
    centered: false,
    primary: false,
    title: "",
    small: false,
    inline: false,
};

export default Spinner;
