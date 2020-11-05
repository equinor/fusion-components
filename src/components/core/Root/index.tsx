import styles from './styles.less';

import FusionContainer from '../Container';
import NotificationSnacks from '../NotificationSnacks';
import NotificationDialog from '../NotificationDialog';
import { useComponentDisplayClassNames, useFusionContext } from '@equinor/fusion';
import classNames from 'classnames';
import { useCallback } from 'react';

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

    const registerPresenter = useCallback(
        (level, present) => notificationCenter.registerPresenter(level, present),
        [notificationCenter]
    );

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
                <NotificationSnacks registerPresenter={registerPresenter} />
            </div>
            <div className={styles.dialog}>
                <NotificationDialog />
            </div>
        </div>
    );
};

export default FusionRoot;
