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
import { useHorizontalBreakpoint } from '@equinor/fusion-components';
import AppManifest from '@equinor/fusion/lib/app/AppManifest';
import { createElement } from 'react';

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
    settings: React.ReactElement | null;
    quickFactScope?: string;
    showSettings?: boolean;
};

const FusionHeader: React.FC<FusionHeaderProps> = ({
    start,
    content,
    aside,
    settings,
    quickFactScope,
    showSettings,
}) => {
    const {
        refs: { headerContent, headerAppAside },
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
                {content && createElement(content, { app: currentApp })}
            </div>

            <aside className={styles.asideContainer}>
                <div
                    ref={headerAppAside as React.MutableRefObject<HTMLDivElement | null>}
                    className={styles.asideAppContainer}
                ></div>
                <ComponentDisplayToggleButton quickFactScope={quickFactScope} />
                {aside}
                <CurrentUserButton quickFactScope={quickFactScope} />
            </aside>
        </header>
    );
};

export default FusionHeader;
