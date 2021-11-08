import { FC, ReactNode } from 'react';
import classNames from 'classnames';
//import styles from './styles.less';
import { useStyles } from './Accordion.style';
import { SortIcon } from '@equinor/fusion-components';
import { useComponentDisplayClassNames } from '@equinor/fusion';
import { clsx } from '@equinor/fusion-react-styles';


type AccordionItemProps = {
    isOpen?: boolean;
    disabled?: boolean;
    onChange?: () => void;
    children?: any;
    label: string | ReactNode;
    actionDirection?: 'left' | 'right';
};

const AccordionItem: FC<AccordionItemProps> = ({
    isOpen,
    onChange,
    children,
    disabled,
    label,
    actionDirection,
}) => {
    const styles = useStyles();
    const headerClassNames = clsx(styles.header, useComponentDisplayClassNames(styles), {
        [styles.isOpen]: isOpen,
        [styles.disabled]: disabled,
        [styles.rightAction]: actionDirection && actionDirection === 'right',
    });

    const contentContainerClassNames = clsx(styles.contentContainer, {
        [styles.isOpen]: isOpen,
    });

    return (
        <div className={styles.accordion}>
            <div className={headerClassNames} onClick={onChange}>
                <div className={styles.label}>{label}</div>
                <div className={styles.collapseIcon}>
                    <SortIcon direction={isOpen ? 'asc' : 'desc'} />
                </div>
            </div>
            <div className={contentContainerClassNames}>
                <div className={styles.content}>{children}</div>
            </div>
        </div>
    );
};

export default AccordionItem;
