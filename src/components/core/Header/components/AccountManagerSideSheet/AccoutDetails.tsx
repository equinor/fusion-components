import * as React from 'react';
import * as styles from "./styles.less"
import {
    PersonDetails,
    UserMenuSectionItem,
    UserMenuSection,
    useFusionContext,
} from '@equinor/fusion';
import {
    MenuItemType,
    PersonPhoto,
    PersonDetail,
    Button,
    ExitToAppIcon,
    Menu,
    styling,
} from '@equinor/fusion-components';

type AccountDetailsProps = {
    personDetails: PersonDetails;
    onMenuClick: (item: UserMenuSectionItem) => void;
    sections: UserMenuSection[];
};

const AccountDetails: React.FC<AccountDetailsProps> = ({
    onMenuClick,
    personDetails,
    sections,
}) => {
    const { auth } = useFusionContext();
    const signOutUser = React.useCallback(async () => await auth.container.logoutAsync(), [auth]);

    const onClick = React.useCallback(
        (item: MenuItemType) => {
            const clickedItem = item as UserMenuSectionItem;
            clickedItem.onClick && clickedItem.onClick(clickedItem);
            clickedItem.component && onMenuClick(clickedItem);
        },
        [onMenuClick]
    );

    return (
        <div className={styles.detailsContainer}>
            <div className={styles.personPhoto}>
                <PersonPhoto person={personDetails} size="xlarge" hidePopover hideTooltip />
            </div>
            <div className={styles.personDetails}>
                <PersonDetail person={personDetails} noPhoto />
            </div>
            <div className={styles.signOutContainer}>
                <Button frameless onClick={signOutUser}>
                    <span className={styles.signOutLabel}>Sign out</span>
                    <ExitToAppIcon color={styling.colors.blackAlt2} />
                </Button>
            </div>
            <div className={styles.menuContainer}>
                <Menu sections={sections} elevation={0} onClick={onClick} />
            </div>
        </div>
    );
};

export default AccountDetails
