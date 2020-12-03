import * as styles from './styles.less';
import { UserMenuSectionItem, PersonDetails } from '@equinor/fusion';
import { IconButton, ArrowBackIcon } from '@equinor/fusion-components';
import { FC } from 'react';

type MenuComponentProps = {
    selectedMenuItem: UserMenuSectionItem;
    onBackClick: VoidFunction;
    personDetails: PersonDetails;
};

const MenuComponent: FC<MenuComponentProps> = ({
    selectedMenuItem,
    onBackClick,
    personDetails,
}) => {
    const Component = selectedMenuItem.component || null;
    return (
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
            {Component ? <Component personDetails={personDetails} /> : null}
        </div>
    );
};

export default MenuComponent;
