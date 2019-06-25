import React from 'react';
import { useComponentDisplayType, ComponentDisplayType, useAppContext } from '@equinor/fusion';
import FusionLogo from '../FusionLogo';

import styles from './styles.less';
import classNames from 'classnames';
import ComponentDisplayToggleButton from './components/ComponentDisplayToggleButton';
import CurrentUserButton from './components/CurrentUserButton';

type FusionHeaderProps = {
    start: React.ReactElement | null;
    content: React.ReactElement | null;
    aside: React.ReactElement | null;
};

const FusionHeader: React.FC<FusionHeaderProps> = ({ start, content, aside }) => {
    const currentApp = useAppContext();

    const componentDisplayType = useComponentDisplayType();

    const headerClassNames = classNames(styles.container, {
        [styles.comfortable]: componentDisplayType === ComponentDisplayType.Comfortable,
        [styles.compact]: componentDisplayType === ComponentDisplayType.Compact,
    });

    return (
        <header className={headerClassNames}>
            <div className={styles.startContainer}>
                {start}
            </div>
            <a href="/" className={styles.fusionTitleContainer}>
                <span className={styles.fusionLogo}>
                    <FusionLogo scale={componentDisplayType === ComponentDisplayType.Compact ? 0.7 : 0.8} />
                </span>
                <span className={styles.fusionTitle}>fusion</span>
                {currentApp && currentApp.appKey && (
                    <>
                        <span>|</span>
                        <a href={currentApp.appPath}>{currentApp.appKey}</a>
                    </>
                )}
            </a>

            <div className={styles.contentContainer}>{content}</div>

            <aside className={styles.asideContainer}>
                <ComponentDisplayToggleButton />
                {aside}
                <CurrentUserButton />
            </aside>
        </header>
    );
};

export default FusionHeader;
