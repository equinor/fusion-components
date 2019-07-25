import React from 'react';
import classNames from 'classnames';
import styles from '../styles.less';
import { ExpandCellProps } from '../types';

const ExpandCell: React.FC<ExpandCellProps> = ({
    isExpandable,
    isExpanded,
    isHovering,
    onClick,
    onMouseOut,
    onMouseOver,
}) => (
    <div
        onMouseLeave={onMouseOut}
        onMouseEnter={onMouseOver}
        onClick={() => isExpandable && onClick()}
        className={classNames(styles.cell, styles.expand, {
            [styles.isExpandable]: isExpandable,
            [styles.isExpanded]: isExpanded,
            [styles.isHovering]: isHovering,
        })}
    >
        {isExpandable && <span>&gt;</span>}
    </div>
);

export default ExpandCell;
