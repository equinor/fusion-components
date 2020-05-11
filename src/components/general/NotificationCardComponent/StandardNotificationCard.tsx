import * as React from 'react';
import { AdaptiveCardViewer, IconButton, CloseIcon } from '@equinor/fusion-components';
import { NotificationCard } from '@equinor/fusion';
import * as styles from './styles.less';

type StandardNotificationCardProps = {
    notification: NotificationCard;
    onDiscard?: () => void;
    actionableComponents?: React.ReactNode[];
};

const StandardNotificationCard: React.FC<StandardNotificationCardProps> = ({
    notification,
    onDiscard,
    actionableComponents,
}) => {
    return (
        <div className={styles.cardContainer}>
            <AdaptiveCardViewer payload={notification.card} className={styles.notificationCard} />
            {actionableComponents && actionableComponents.length > 0 && (
                <div className={styles.actionableComponents}>{actionableComponents}</div>
            )}
            {onDiscard && (
                <div className={styles.closeIconContainer}>
                    <IconButton onClick={onDiscard}>
                        <CloseIcon />
                    </IconButton>
                </div>
            )}
        </div>
    );
};
export default StandardNotificationCard;
