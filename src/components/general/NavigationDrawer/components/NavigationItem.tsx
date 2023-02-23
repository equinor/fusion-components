import classNames from 'classnames';
import { FC } from 'react';
import { useAnchor, UseAnchorProps } from '../../ApplicationGuidance';
import { useStyles } from './Components.style';

type NavigationItemProps = {
    id?: string;
    children: any;
    isActive?: boolean;
    isCollapsed?: boolean;
    type: 'child' | 'section' | 'grouping';
    onClick?: () => void;
    isDisabled?: boolean;
    info?: UseAnchorProps;
    style?: React.CSSProperties;
    noHoverContainer?: boolean;
};

const NavigationItem: FC<NavigationItemProps> = ({
    id,
    children,
    isActive,
    isCollapsed,
    type,
    onClick,
    isDisabled,
    info,
    style,
    noHoverContainer,
}: NavigationItemProps) => {
    const styles = useStyles();

    const containerClassNames = classNames(styles.container, {
        [styles.noHoverContainer]: noHoverContainer,
        [styles.isActive]: isActive,
        [styles.isCollapsed]: isCollapsed,
        [styles.menuSection]: type === 'section',
        [styles.menuChild]: type === 'child',
        [styles.isDisabled]: isDisabled,
    });

    const anchorRef = useAnchor<HTMLDivElement>(info);

    return (
        <div
            id={id}
            style={style}
            className={containerClassNames}
            onClick={onClick}
            ref={anchorRef}
        >
            {children}
            <div className={styles.visualOnClickContainer} />
        </div>
    );
};

export default NavigationItem;
