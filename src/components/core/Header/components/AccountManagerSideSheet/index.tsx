import { ModalSideSheet, styling } from '@equinor/fusion-components';
import {
    PersonDetails,
    useFusionContext,
    useEventEmitterValue,
    UserMenuSectionItem,
} from '@equinor/fusion';
import AccountDetails from './AccoutDetails';
import MenuComponent from './MenuComponent';
import { useState, useCallback, FC } from 'react';

type AccountManagerSideSheet = {
    show: boolean;
    onClose: VoidFunction;
    personDetails: PersonDetails;
};

const AccountManagerSideSheet: FC<AccountManagerSideSheet> = ({
    show,
    onClose,
    personDetails,
}) => {
    const [selectedMenuItem, setSelectedMenuItem] = useState<UserMenuSectionItem | null>(null);

    const { userMenuSectionsContainer } = useFusionContext();
    const [customSections] = useEventEmitterValue(
        userMenuSectionsContainer,
        'change',
        undefined,
        userMenuSectionsContainer.sections
    );

    const removeSelectedMenuItem = useCallback(() => setSelectedMenuItem(null), []);

    return (
        <ModalSideSheet
            header="My account"
            show={show}
            onClose={onClose}
            size="small"
            isResizable
            minWidth={styling.numericalGrid(40)}
        >
            {selectedMenuItem ? (
                <MenuComponent
                    selectedMenuItem={selectedMenuItem}
                    onBackClick={removeSelectedMenuItem}
                    personDetails={personDetails}
                />
            ) : (
                <AccountDetails
                    onMenuClick={setSelectedMenuItem}
                    personDetails={personDetails}
                    sections={customSections}
                />
            )}
        </ModalSideSheet>
    );
};
export default AccountManagerSideSheet;
