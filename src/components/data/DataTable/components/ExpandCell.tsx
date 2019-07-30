import React from 'react';
import classNames from 'classnames';
import styles from '../styles.less';
import { ExpandCellProps } from '../dataTableTypes';
import { DropdownArrow } from "@equinor/fusion-components"

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
        {isExpandable && <DropdownArrow isOpen={isExpanded} />}
    </div>
);

export default ExpandCell;
