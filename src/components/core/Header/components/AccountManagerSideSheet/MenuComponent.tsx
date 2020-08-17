import * as React from 'react';
import * as styles from './styles.less';
import { UserMenuSectionItem } from '@equinor/fusion';
import { IconButton, ArrowBackIcon } from '@equinor/fusion-components';

type MenuComponentProps = {
    selectedMenuItem: UserMenuSectionItem;
    onBackClick: () => void;
};

const MenuComponent: React.FC<MenuComponentProps> = ({ selectedMenuItem, onBackClick }) => (
    <div className={styles.menuComponentContainer}>
        <div className={styles.header}>
            <div className={styles.backButton}>
                <IconButton onClick={onBackClick}>
                    <ArrowBackIcon />
                </IconButton>
            </div>
            <div className={styles.itemHeader}>
                {selectedMenuItem.aside}
                <span className={styles.title}>{selectedMenuItem.title}</span>
            </div>
        </div>
        {selectedMenuItem.component}
    </div>
);

export default MenuComponent;
