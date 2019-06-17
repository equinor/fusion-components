import * as React from 'react';
import styles from './styles.less';

type BannerProps = {
    message: string;
    actions: Array<JSX.Element>;
    icon?: any
};

const Banner: React.FC<BannerProps> = ({ message, actions }) => {
    const bannerActions = React.useMemo(() => {
        if (!actions || !actions.length) {
            return null
        }
        return <div className={styles.actions}>{actions.map(action => action)}</div>;;
    }, [actions]);

    return (
        <div className={styles.container}>
            <div className={styles.message}>{message}</div>
            {bannerActions}
        </div>
    );
};

Banner.displayName = 'Banner';

export default Banner;
