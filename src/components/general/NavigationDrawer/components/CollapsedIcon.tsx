import React, { ReactNode } from 'react';
import styles from './styles.less';
import { useTooltipRef } from '@equinor/fusion-components';

type CollapsedIconProps = {
    onClick?: () => void;
    children: ReactNode;
    title: string;
};

const CollapsedIcon = ({ onClick, children, title }: CollapsedIconProps) => {
    const tooltipRef = useTooltipRef(title, 'right');
    return (
        <div className={styles.navigationIcon} onClick={onClick} ref={tooltipRef}>
            {children}
        </div>
    );
};

export default CollapsedIcon;
