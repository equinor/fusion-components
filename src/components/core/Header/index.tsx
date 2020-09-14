import React from 'react';
import {
    useComponentDisplayClassNames,
    useCurrentApp,
    combineUrls,
    useFusionContext,
} from '@equinor/fusion';
import { NavLink } from 'react-router-dom';
import FusionLogo from '../FusionLogo';

import styles from './styles.less';
import classNames from 'classnames';
import ComponentDisplayToggleButton from './components/ComponentDisplayToggleButton';
import CurrentUserButton from './components/CurrentUserButton';
import { useHorizontalBreakpoint, ApplicationGuidanceAnchor } from '@equinor/fusion-components';
import AppManifest from '@equinor/fusion/lib/app/AppManifest';
import NotificationsButton from './components/NotificationsButton';

enum Breakpoints {
    medium = 'medium',
    small = 'small',
}

const breakpoints = [
    {
        key: Breakpoints.medium,
        width: 767,
    },
    {
        key: Breakpoints.small,
        width: 0,
    },
];

export type HeaderContentProps = {
    app: AppManifest | null;
};

type FusionHeaderProps = {
    start: React.ReactElement | null;
    content: React.FC<HeaderContentProps> | null;
    aside: React.ReactElement | null;
    quickFactScope?: string;
};

const FusionHeader: React.FC<FusionHeaderProps> = ({ start, content, aside, quickFactScope }) => {
    const {
        refs: { headerContent },
    } = useFusionContext();
    const currentApp = useCurrentApp();

    const headerClassNames = classNames(styles.container, useComponentDisplayClassNames(styles));
    const [breakpointRef, breakpointKey] = useHorizontalBreakpoint(breakpoints);

    if (!breakpointKey) {
        return <div className={headerClassNames} ref={breakpointRef} />;
    }

    return (
        <header className={headerClassNames} ref={breakpointRef}>
            <div className={styles.startContainer}>{start}</div>
            <div className={styles.fusionTitleContainer}>
                <NavLink to="/">
                    <span className={styles.fusionLogo}>
                        {breakpointKey === 'small' ? (
                            <FusionLogo scale={0.5} />
                        ) : (
                            <FusionLogo scale={0.7} />
                        )}
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
            <div
                className={styles.contentContainer}
                ref={headerContent as React.MutableRefObject<HTMLDivElement | null>}
            >
                {content && React.createElement(content, { app: currentApp })}
            </div>

            <aside className={styles.asideContainer}>
                <ApplicationGuidanceAnchor id={'display-toggle-btn'} scope={quickFactScope} snug>
                    <ComponentDisplayToggleButton />
                </ApplicationGuidanceAnchor>
                {aside}
                <ApplicationGuidanceAnchor id={'notification'} scope={quickFactScope} snug>
                    <NotificationsButton />
                </ApplicationGuidanceAnchor>
                <ApplicationGuidanceAnchor id={'current-user-btn'} scope={quickFactScope} snug>
                    <CurrentUserButton />
                </ApplicationGuidanceAnchor>
            </aside>
        </header>
    );
};

export default FusionHeader;
