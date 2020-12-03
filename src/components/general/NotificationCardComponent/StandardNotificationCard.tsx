import { AdaptiveCardViewer } from '@equinor/fusion-components';
import { NotificationCard } from '@equinor/fusion';
import * as styles from './styles.less';
import { FC } from 'react';

type StandardNotificationCardProps = {
    notification: NotificationCard;
    discardComponent?: React.ReactNode;
    actionableComponents?: React.ReactNode[];
};

const StandardNotificationCard: FC<StandardNotificationCardProps> = ({
    notification,
    discardComponent,
    actionableComponents,
}) => {
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
