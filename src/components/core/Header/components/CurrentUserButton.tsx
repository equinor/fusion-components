import { useCurrentPersonDetails } from '@equinor/fusion';
import { IconButton, PersonPhoto, useAnchor } from '@equinor/fusion-components';
import { useState, useCallback, FC } from 'react';

import AccountManagerSideSheet from './AccountManagerSideSheet';

type CurrentUserButtonProp = {
    quickFactScope?: string;
};
const CurrentUserButton: FC<CurrentUserButtonProp> = ({ quickFactScope }) => {
    const { personDetails } = useCurrentPersonDetails();
    const [showAccountManager, setShowAccountManager] = useState<boolean>(false);

    const closeSideSheet = useCallback(() => {
        setShowAccountManager(false);
    }, []);

    const openSideSheet = useCallback(() => {
        setShowAccountManager(true);
    }, []);

    const ref = useAnchor<HTMLButtonElement>({ id: 'current-user-btn', scope: quickFactScope });

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
