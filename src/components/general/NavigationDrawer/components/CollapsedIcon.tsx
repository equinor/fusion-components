import React, { ReactNode, forwardRef, MutableRefObject } from 'react';
import styles from './styles.less';
import { useTooltipRef } from '@equinor/fusion-components';

type CollapsedIconProps = {
    onClick?: () => void;
    children: ReactNode;
    title: string;
};

const CollapsedIcon = forwardRef<
    HTMLDivElement | null,
    React.PropsWithChildren<CollapsedIconProps>
>(({ onClick, children, title }, ref) => {
    const iconRef = ref as MutableRefObject<HTMLDivElement | null>;
    
    return (
        <div className={styles.navigationIcon} onClick={onClick} ref={iconRef}>
            {children}
        </div>
    );
});

export default CollapsedIcon;
