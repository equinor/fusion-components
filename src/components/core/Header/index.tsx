import * as React from 'react';
import { useCurrentUser } from '@equinor/fusion';
import FusionLogo from '../FusionLogo';

import * as styles from './styles.less';

type FusionHeaderProps = {};

const FusionHeader: React.FC<FusionHeaderProps> = () => {
    const currentUser = useCurrentUser();

    return (
        <header className={styles.container}>
            <a href="/" className={styles.fusionTitleContainer}>
                <span className={styles.fusionLogo}>
                    <FusionLogo scale={0.8} />
                </span>
                <span className={styles.fusionTitle}>fusion</span>
            </a>

            <div className={styles.contextContainer} />

            <div className={styles.tempCurrentUser}>
                {currentUser ? currentUser.givenName : null}
            </div>
        </header>
    );
};

export default FusionHeader;
