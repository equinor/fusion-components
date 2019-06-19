import * as React from 'react';
import styles from './styles.less';
import Button from '../../general/Button';
import classNames from 'classnames';

type BannerProps = {
    message: string;
    icon?: any;
    cancelLabel: string;
    onCancel: () => void;
    action?: boolean;
    actionLabel?: string;
    onAction?: () => void;
};

const Banner: React.FC<BannerProps> = ({
    message,
    icon,
    cancelLabel,
    onCancel,
    action,
    actionLabel,
    onAction,
}) => {
    const [isVisible, setIsVisible] = React.useState(false);

    React.useEffect(() => {
        setIsVisible(true);
    }, []);

    const cancelButton = (
        <Button frameless comfortable onClick={onCancel}>
            {cancelLabel}
        </Button>
    );
    const actionButton = action ? (
        <Button frameless comfortable onClick={onAction}>
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
                {cancelButton}
            </div>
        </div>
    );
};

Banner.displayName = 'Banner';

export default Banner;
