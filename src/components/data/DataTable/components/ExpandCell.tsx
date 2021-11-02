import classNames from 'classnames';
import styles from '../styles.less';
import { ExpandCellProps } from '../dataTableTypes';
import { DropdownArrow } from '@equinor/fusion-components';
import { FC } from 'react';

const ExpandCell: FC<ExpandCellProps> = ({
    isExpandable,
    isExpanded,
    isHovering,
    onClick,
    onMouseOut,
    onMouseOver,
    className,
    isSelected,
    id,
}) => (
    <div
        id={id}
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
