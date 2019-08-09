import React from 'react';
import styles from './styles.less';

import FusionContainer from '../Container';
import NotificationSnacks from '../NotificationSnacks';
import NotificationDialog from '../NotificationDialog';

type FusionRootProps = {
    rootRef: React.MutableRefObject<HTMLElement | null>;
    overlayRef: React.MutableRefObject<HTMLElement | null>;
};

const FusionRoot: React.FC<FusionRootProps> = ({ children, rootRef, overlayRef }) => (
    <div className={styles.container}>
        <FusionContainer ref={rootRef as React.MutableRefObject<HTMLDivElement>}>
            {children}
        </FusionContainer>
        <div
            className={styles.overlay}
            ref={overlayRef as React.MutableRefObject<HTMLDivElement>}
        />
        <div className={styles.snacks}>
            <NotificationSnacks />
        </div>
        <div className={styles.dialog}>
            <NotificationDialog />
        </div>
    </div>
);

export default FusionRoot;
