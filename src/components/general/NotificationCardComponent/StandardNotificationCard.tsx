import { AdaptiveCardViewer } from '@equinor/fusion-components';
import { NotificationCard } from '@equinor/fusion';
import { useStyles } from './StandardNotificationCard.style';
import { FC, ReactNode } from 'react';

type StandardNotificationCardProps = {
    notification: NotificationCard;
    discardComponent?: ReactNode;
    actionableComponents?: ReactNode[];
};

const StandardNotificationCard: FC<StandardNotificationCardProps> = ({
    notification,
    discardComponent,
    actionableComponents,
}) => {
    const styles = useStyles();
    return (
        <div className={styles.cardContainer}>
            <AdaptiveCardViewer payload={notification.card} className={styles.notificationCard} />
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
