import { ReactNode, forwardRef, MutableRefObject, PropsWithChildren } from 'react';
import styles from './styles.less';

type CollapsedIconProps = {
    onClick?: () => void;
    children: ReactNode;
};

const CollapsedIcon = forwardRef<HTMLDivElement | null, PropsWithChildren<CollapsedIconProps>>(
    ({ onClick, children }, ref) => {
        const iconRef = ref as MutableRefObject<HTMLDivElement | null>;

        return (
            <div className={styles.navigationIcon} onClick={onClick} ref={iconRef}>
                {children}
            </div>
        );
    }
);

export default CollapsedIcon;
