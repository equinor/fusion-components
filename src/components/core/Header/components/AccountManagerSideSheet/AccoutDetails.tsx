import * as React from 'react';
import * as styles from './styles.less';
import { PersonDetails, UserMenuSectionItem, UserMenuSection } from '@equinor/fusion';
import { MenuItemType, PersonPhoto, PersonDetail, Menu } from '@equinor/fusion-components';

type AccountDetailsProps = {
    personDetails: PersonDetails;
    onMenuClick: (item: UserMenuSectionItem) => void;
    sections: UserMenuSection[];
};

type MenuItemComponentProps = {
    item: MenuItemType;
};

const ItemComponent: React.FC<MenuItemComponentProps> = ({ item }) => {
    return <span className={styles.itemComponent}>{item.title}</span>;
};

const AsideComponent: React.FC<MenuItemComponentProps> = ({ item }) => {
    return <div className={styles.itemComponent}>{item.aside}</div>;
};

const AccountDetails: React.FC<AccountDetailsProps> = ({
    onMenuClick,
    personDetails,
    sections,
}) => {
    const onMenuItemClick = React.useCallback(
        (item: MenuItemType) => {
            const clickedItem = item as UserMenuSectionItem;
            clickedItem.onClick && clickedItem.onClick(clickedItem, personDetails);
            clickedItem.component && onMenuClick(clickedItem);
        },
        [onMenuClick, personDetails]
    );

    return (
        <div className={styles.detailsContainer}>
            <div className={styles.personPhoto}>
                <PersonPhoto person={personDetails} size="xlarge" hidePopover hideTooltip />
            </div>
            <div className={styles.personDetails}>
                <PersonDetail person={personDetails} noPhoto />
            </div>

            <div className={styles.menuContainer}>
                <Menu
                    sections={sections}
                    elevation={0}
                    onClick={onMenuItemClick}
                    itemComponent={ItemComponent}
                    asideComponent={AsideComponent}
                />
            </div>
        </div>
    );
};

export default AccountDetails;
