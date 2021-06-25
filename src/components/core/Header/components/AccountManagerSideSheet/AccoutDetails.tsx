import styles from './styles.less';
import { PersonDetails, UserMenuSectionItem, UserMenuSection } from '@equinor/fusion';
import { MenuItemType, PersonPhoto, PersonDetail, Menu } from '@equinor/fusion-components';
import { useCallback, FC } from 'react';
import usePresence from './usePresence';

type AccountDetailsProps = {
    personDetails: PersonDetails;
    onMenuClick: (item: UserMenuSectionItem) => void;
    sections: UserMenuSection[];
};

type MenuItemComponentProps = {
    item: MenuItemType;
};

const ItemComponent: FC<MenuItemComponentProps> = ({ item }) => {
    return <span className={styles.itemComponent}>{item.title}</span>;
};

const AsideComponent: FC<MenuItemComponentProps> = ({ item }) => {
    return <div className={styles.itemComponent}>{item.aside}</div>;
};

const AccountDetails: FC<AccountDetailsProps> = ({ onMenuClick, personDetails, sections }) => {
    const { presence } = usePresence(personDetails.azureUniqueId);
    const onMenuItemClick = useCallback(
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
                <PersonDetail person={personDetails} presence={presence} noPhoto />
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
