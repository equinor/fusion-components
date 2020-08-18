import * as React from 'react';
import {
    ModalSideSheet,
    SecurityIcon,
    styling,
    WorkIcon,
    DelveIcon,
} from '@equinor/fusion-components';
import {
    PersonDetails,
    useFusionContext,
    useEventEmitterValue,
    UserMenuSectionItem,
} from '@equinor/fusion';
import AccountDetails from './AccoutDetails';
import MenuComponent from './MenuComponent';
import MyRoles from '../MyRoles';
import MyPositions from '../MyPositions';

type AccountManagerSideSheet = {
    show: boolean;
    onClose: () => void;
    personDetails: PersonDetails;
};

const delveBaseUrl = 'https://eur.delve.office.com/?u=';

const AccountManagerSideSheet: React.FC<AccountManagerSideSheet> = ({
    show,
    onClose,
    personDetails,
}) => {
    const [selectedMenuItem, setSelectedMenuItem] = React.useState<UserMenuSectionItem | null>(
        null
    );

    const { userMenuSectionsContainer } = useFusionContext();
    const [customSections] = useEventEmitterValue(
        userMenuSectionsContainer,
        'change',
        undefined,
        userMenuSectionsContainer.sections
    );
    const sections = React.useMemo(
        () => [
            {
                key: 'account',
                title: '',
                items: [
                    {
                        key: 'my-positions',
                        title: 'My positions',
                        aside: <WorkIcon />,
                        component: MyPositions,
                    },
                    {
                        key: 'my-roles',
                        title: 'My roles',
                        aside: <SecurityIcon />,
                        component: MyRoles,
                    },
                ],
            },
            {
                key: 'delve-section',
                title: '',
                items: [
                    {
                        key: 'delve',
                        title: 'Delve',
                        aside: <DelveIcon />,
                        onClick: () =>
                            window.open(
                                delveBaseUrl + personDetails?.azureUniqueId || '',
                                '_blank'
                            ),
                    },
                ],
            },
            ...(customSections || []),
        ],
        [customSections, personDetails]
    );
    const removeSelectedMenuItem = React.useCallback(() => setSelectedMenuItem(null), []);

    return (
        <ModalSideSheet
            header="Account manager"
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
                    sections={sections}
                />
            )}
        </ModalSideSheet>
    );
};
export default AccountManagerSideSheet;
