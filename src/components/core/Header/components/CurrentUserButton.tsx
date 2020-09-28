import React from 'react';
import { useCurrentPersonDetails } from '@equinor/fusion';
import { IconButton, PersonPhoto, useAnchor } from '@equinor/fusion-components';

import AccountManagerSideSheet from './AccountManagerSideSheet';
import { string } from 'prop-types';

type CurrentUserButtonProp = {
    quickFactScope?: string,
}
const CurrentUserButton: React.FC<CurrentUserButtonProp> = ({quickFactScope}) => {
    const { personDetails } = useCurrentPersonDetails();
    const [showAccountManager, setShowAccountManager] = React.useState<boolean>(false);

    const closeSideSheet = React.useCallback(() => {
        setShowAccountManager(false);
    }, []);

    const openSideSheet = React.useCallback(() => {
        setShowAccountManager(true);
    }, []);

    const ref = useAnchor<HTMLButtonElement>({id: "current-user-btn", scope: quickFactScope})

    return (
        <>
            <IconButton active={showAccountManager} onClick={openSideSheet} ref={ref}>
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
