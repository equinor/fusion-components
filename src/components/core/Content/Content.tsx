import { FC } from 'react';
//import styles from './styles.less';
import { useStyles } from './Content.style';
import NotificationBanners from '../NotificationBanner';
import { useFusionContext } from '@equinor/fusion';

export const FusionContent: FC = ({ children }) => {
    const { notificationCenter } = useFusionContext();
    const styles = useStyles();
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
