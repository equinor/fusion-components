import { useComponentDisplayClassNames, combineUrls, useFusionContext, type AppManifest } from '@equinor/fusion';
import { NavLink } from 'react-router-dom';
import FusionLogo from '../FusionLogo';

import styles from './styles.less';
import classNames from 'classnames';
import ComponentDisplayToggleButton from './components/ComponentDisplayToggleButton';
import CurrentUserButton from './components/CurrentUserButton';
import { useHorizontalBreakpoint } from '@equinor/fusion-components';
import {
    createElement,
    FC,
    ReactElement,
    MutableRefObject
} from 'react';
import FullscreenToggleButton from './components/FullscreenToggleButton';

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

type frameworkManifest = {
    key: string;
    name: string;
}

type FusionHeaderProps = {
    start: ReactElement | null;
    content: FC<HeaderContentProps> | null;
    aside: ReactElement | null;
    settings: ReactElement | null;
    quickFactScope?: string;
    showSettings?: boolean;
    currentApp?: frameworkManifest;
    currentContextId?: string;
};

const FusionHeader: FC<FusionHeaderProps> = ({
    start,
    content,
    aside,
    quickFactScope,
    currentApp,
    currentContextId,
}) => {
    const {
        refs: { headerContent, headerAppAside },
    } = useFusionContext();

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
                {currentApp && (
                    <>
                        <span className={styles.appNameDivider} />
                        <NavLink
                            to={combineUrls('/apps', currentApp.key, currentContextId || '')}
                            className={styles.appNameLink}
                        >
                            {currentApp.name}
                        </NavLink>
                    </>
                )}
            </div>
            <div
                className={styles.contentContainer}
                ref={headerContent as MutableRefObject<HTMLDivElement | null>}
            >
                {currentApp && content && createElement(content)}
            </div>

            <aside className={styles.asideContainer}>
                <div
                    ref={headerAppAside as MutableRefObject<HTMLDivElement | null>}
                    className={styles.asideAppContainer}
                ></div>
                <FullscreenToggleButton quickFactScope={quickFactScope} />
                <ComponentDisplayToggleButton quickFactScope={quickFactScope} />
                {aside}
                <CurrentUserButton quickFactScope={quickFactScope} />
            </aside>
        </header>
    );
};

export default FusionHeader;
