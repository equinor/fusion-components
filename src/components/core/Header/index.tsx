import React from 'react';
import {
    useComponentDisplayClassNames,
    useCurrentApp,
    combineUrls,
} from '@equinor/fusion';
import { NavLink } from 'react-router-dom';
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
    const currentApp = useCurrentApp();

    const headerClassNames = classNames(styles.container, useComponentDisplayClassNames(styles));

    return (
        <header className={headerClassNames}>
            <div className={styles.startContainer}>{start}</div>
            <div className={styles.fusionTitleContainer}>
                <NavLink to="/">
                    <span className={styles.fusionLogo}>
                        <FusionLogo scale={0.7} />
                    </span>
                    <span className={styles.fusionTitle}>fusion</span>
                </NavLink>
                {currentApp && currentApp.key && (
                    <>
                        <span className={styles.appNameDivider} />
                        <NavLink
                            to={combineUrls('/apps', currentApp.key)}
                            className={styles.appNameLink}
                        >
                            {currentApp.name}
                        </NavLink>
                    </>
                )}
            </div>
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
