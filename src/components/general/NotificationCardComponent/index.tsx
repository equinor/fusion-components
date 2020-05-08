import * as React from 'react';
import { AdaptiveCardViewer } from '@equinor/fusion-components';
import { NotificationCard } from '@equinor/fusion';
import * as styles from './styles.less';

type NotificationCardProps = {
    notification: NotificationCard;
};

const NotificationCard: React.FC<NotificationCardProps> = ({ notification }) => {
    return <AdaptiveCardViewer payload={notification.card} className={styles.notificationCard} />;
};
export default NotificationCard;
