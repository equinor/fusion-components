import { FC } from 'react';
import styles from './styles.less';
import NotificationBanners from '../NotificationBanner';
import { useFusionContext } from '@equinor/fusion';

const FusionContent: FC = ({ children }) => {
    const { notificationCenter } = useFusionContext();
    return (
        <div className={styles.container}>
            <NotificationBanners
                registerPresenter={notificationCenter.registerPresenter.bind(notificationCenter)}
            />
            {children}
        </div>
    );
};

export default FusionContent;