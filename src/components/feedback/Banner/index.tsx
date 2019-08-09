import React, { useState, useEffect } from 'react';
import styles from './styles.less';
import classNames from 'classnames';
import { Button } from '@equinor/fusion-components';

type BannerProps = {
    message: string;
    icon?: any;
    onDismiss: () => void;
    action?: boolean;
    actionLabel?: string;
    onAction?: () => void;
};

const Banner: React.FC<BannerProps> = ({
    message,
    icon,
    onDismiss,
    action,
    actionLabel,
    onAction,
}) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const actionButton = action ? (
        <Button frameless onClick={onAction}>
            {actionLabel}
        </Button>
    ) : null;

    const bannerIcon = icon ? <div className={styles.icon}>{icon}</div> : null;

    const containerClasses = classNames(styles.container, {
        [styles.isVisible]: isVisible,
    });

    return (
        <div className={containerClasses}>
            <div className={styles.information}>
                {bannerIcon}
                <span className={styles.message}>{message}</span>
            </div>
            <div className={styles.actions}>
                {actionButton}
                <Button frameless onClick={onDismiss}>
                    Dismiss
                </Button>
            </div>
        </div>
    );
};

Banner.displayName = 'Banner';

export default Banner;
