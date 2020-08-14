import React from 'react';
import { useCurrentPersonDetails } from '@equinor/fusion';
import { IconButton, PersonPhoto } from '@equinor/fusion-components';

import AccountManagerSideSheet from './AccountManagerSideSheet';

const CurrentUserButton: React.FC = () => {
    const { personDetails } = useCurrentPersonDetails();
    const [showAccountManager, setShowAccountManager] = React.useState<boolean>(false);

    const closeSideSheet = React.useCallback(() => {
        setShowAccountManager(false);
    }, []);

    const openSideSheet = React.useCallback(() => {
        setShowAccountManager(true);
    }, []);

    return (
        <>
            <IconButton active={showAccountManager} onClick={openSideSheet}>
                <PersonPhoto person={personDetails} hidePopover hideTooltip />
            </IconButton>
            <AccountManagerSideSheet
                onClose={closeSideSheet}
                personDetails={personDetails}
                show={showAccountManager}
            />
        </>
    );
};

export default CurrentUserButton;
