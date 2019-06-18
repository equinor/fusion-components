import * as React from 'react';
import styles from './styles.less';
import Button from '../../general/Button';

type BannerProps = {
    message: string;
    icon?: any;
    cancelLabel: string;
    onCancel: () => void;
    action: boolean;
    actionLabel: string;
    onAction: () => void;
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

    return (
        <div className={styles.container}>
            {}
            <div className={styles.message}>{message}</div>
            <div className={styles.actions}>
                {actionButton}
                {cancelButton}
            </div>
        </div>
    );
};

Banner.displayName = 'Banner';

export default Banner;
