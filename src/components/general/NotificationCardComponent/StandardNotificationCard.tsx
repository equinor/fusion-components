import * as React from 'react';
import { NotificationCard } from '@equinor/fusion';
import * as styles from './styles.less';
import AdaptiveCardViewer from '../AdaptiveCardViewer';

type StandardNotificationCardProps = {
    notification: NotificationCard;
    discardComponent?: React.ReactNode;
    actionableComponents?: React.ReactNode[];
};

const StandardNotificationCard: React.FC<StandardNotificationCardProps> = ({
    notification,
    discardComponent,
    actionableComponents,
}) => {
    return (
        <div className={styles.cardContainer}>
            <AdaptiveCardViewer payload={notification.card} className={styles.notificationCard}/>
            {actionableComponents && actionableComponents.length > 0 && (
                <div className={styles.actionableComponents}>{actionableComponents}</div>
            )}
            {discardComponent && (
                <div className={styles.closeIconContainer}>{discardComponent}</div>
            )}
        </div>
    );
};
export default StandardNotificationCard;
