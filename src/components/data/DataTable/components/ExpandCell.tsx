import classNames from 'classnames';
import styles from '../styles.less';
import { ExpandCellProps } from '../dataTableTypes';
import { DropdownArrow } from '@equinor/fusion-components';

const ExpandCell: React.FC<ExpandCellProps> = ({
    isExpandable,
    isExpanded,
    isHovering,
    onClick,
    onMouseOut,
    onMouseOver,
    className,
    isSelected,
}) => (
    <div
        onMouseLeave={onMouseOut}
        onMouseEnter={onMouseOver}
        onClick={() => isExpandable && onClick()}
        className={classNames(className, styles.expand, {
            [styles.isExpandable]: isExpandable,
            [styles.isExpanded]: isExpanded,
            [styles.isHovering]: isHovering,
            [styles.isSelected]: isSelected,
        })}
    >
        {isExpandable && <DropdownArrow isOpen={isExpanded} />}
    </div>
);

export default ExpandCell;
