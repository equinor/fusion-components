import * as React from 'react';
import styles from './styles.less';
import NotificationBanners from '../NotificationBanner';

const FusionContent: React.FC = ({ children }) => {
    return (
        <div className={styles.container}>
            <NotificationBanners />
            {children}
        </div>
    );
};

export default FusionContent;
