import classNames from 'classnames';
import styles from './styles.less';

type NavigationItemProps = {
    children: any;
    isActive?: boolean;
    isCollapsed?: boolean;
    type: 'child' | 'section' | 'grouping';
    onClick?: () => void;
    isDisabled?: boolean;
};

const NavigationItem = ({
    children,
    isActive,
    isCollapsed,
    type,
    onClick,
    isDisabled,
}: NavigationItemProps) => {
    const containerClassNames = classNames(styles.container, {
        [styles.isActive]: isActive,
        [styles.isCollapsed]: isCollapsed,
        [styles.menuSection]: type === 'section',
        [styles.menuChild]: type === 'child',
        [styles.menuGrouping]: type === 'grouping',
        [styles.isDisabled]: isDisabled,
    });

    return (
        <div className={containerClassNames} onClick={onClick}>
            {children}
            <div className={styles.visualOnClickContainer} />
        </div>
    );
};
export default NavigationItem;
