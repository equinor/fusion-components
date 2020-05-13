import React from 'react';
import styles from './styles.less';

import FusionContainer from '../Container';
import NotificationSnacks from '../NotificationSnacks';
import NotificationDialog from '../NotificationDialog';
import { useComponentDisplayClassNames, useFusionContext } from '@equinor/fusion';
import classNames from 'classnames';

type FusionRootProps = {
    rootRef: React.MutableRefObject<HTMLElement | null>;
    overlayRef: React.MutableRefObject<HTMLElement | null>;
    noHeader?: boolean;
};

const FusionRoot: React.FC<FusionRootProps> = ({
    children,
    rootRef,
    overlayRef,
    noHeader = false,
}) => {
    const { notificationCenter } = useFusionContext();

    return (
        <div className={classNames(styles.container, useComponentDisplayClassNames(styles))}>
            <FusionContainer
                ref={rootRef as React.MutableRefObject<HTMLDivElement>}
                noHeader={noHeader}
            >
                {children}
            </FusionContainer>
            <div
                className={styles.overlay}
                ref={overlayRef as React.MutableRefObject<HTMLDivElement>}
            />
            <div className={styles.snacks}>
                <NotificationSnacks
                    registerPresenter={notificationCenter.registerPresenter.bind(
                        notificationCenter
                    )}
                />
            </div>
            <div className={styles.dialog}>
                <NotificationDialog />
            </div>
        </div>
    );
};

export default FusionRoot;
