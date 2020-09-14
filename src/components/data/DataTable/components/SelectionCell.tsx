import React, { forwardRef } from 'react';
import { SelectionCellProps } from '../dataTableTypes';
import classNames from 'classnames';
import styles from '../styles.less';
import { CheckBox } from 'components/general/SelectionControls';

const SelectionCell = forwardRef<
    HTMLDivElement | null,
    React.PropsWithChildren<SelectionCellProps>
>(
    (
        {
            isSelectable,
            isSelected,
            onChange,
            onMouseOut,
            onMouseOver,
            isHovering,
            className,
            indeterminate,
        },
        ref
    ) => {
        return (
            <div
                onMouseLeave={onMouseOut}
                onMouseEnter={onMouseOver}
                className={classNames(className, styles.select, {
                    [styles.isHovering]: isHovering,
                    [styles.isSelectable]: isSelectable,
                    [styles.isSelected]: isSelected,
                })}
                ref={ref as React.MutableRefObject<HTMLDivElement | null>}
            >
                {isSelectable && (
                    <CheckBox
                        selected={isSelected}
                        onChange={onChange}
                        indeterminate={indeterminate}
                    />
                )}
            </div>
        );
    }
);

export default SelectionCell;
