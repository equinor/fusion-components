import classNames from 'classnames';
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
};

const NavigationItem = ({
    id,
    children,
    isActive,
    isCollapsed,
    type,
    onClick,
    isDisabled,
    info,
}: NavigationItemProps) => {
    const styles = useStyles();
    const containerClassNames = classNames(styles.container, {
        [styles.isActive]: isActive,
        [styles.isCollapsed]: isCollapsed,
        [styles.menuSection]: type === 'section',
        [styles.menuChild]: type === 'child',
        //[styles.menuGrouping]: type === 'grouping',
        [styles.isDisabled]: isDisabled,
    });

    const anchorRef = useAnchor<HTMLDivElement>(info);

    return (
        <div id={id} className={containerClassNames} onClick={onClick} ref={anchorRef}>
            {children}
            <div className={styles.visualOnClickContainer} />
        </div>
    );
};

export default NavigationItem;
