import React from 'react';
import { useCurrentUser, useFusionContext } from '@equinor/fusion';
import { useIcon, IconProps, MenuSection, MenuItemType, Menu, usePopoverRef } from 'index';

const CurrentUserIcon = (props: IconProps) => {
    const iconFactory = useIcon(
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 5C13.66 5 15 6.34 15 8C15 9.66 13.66 11 12 11C10.34 11 9 9.66 9 8C9 6.34 10.34 5 12 5ZM6 15.98C7.29 17.92 9.5 19.2 12 19.2C14.5 19.2 16.71 17.92 18 15.98C17.97 13.99 13.99 12.9 12 12.9C10 12.9 6.03 13.99 6 15.98Z"
            fill="currentColor"
        />
    );

    return iconFactory(props);
};

const CurrentUserDropdown: React.FC = () => {
    const { auth } = useFusionContext();
    const currentUser = useCurrentUser();

    if (!currentUser) {
        return null;
    }

    const sections: MenuSection[] = [
        {
            key: currentUser.id,
            title: `${currentUser.givenName} ${currentUser.familyName}`,
            items: [
                {
                    key: 'logout',
                    title: 'Sign out',
                },
            ],
            // TODO: Allow core and apps to add custom buttons like "Preview features" etc.
            // Should be provided through the fusion context, not props
        },
    ];

    const onClick = async (item: MenuItemType) => {
        switch (item.key) {
            case 'logout':
                await auth.container.logoutAsync();
                break;
        }
    };

    return <Menu sections={sections} onClick={onClick} elevation={0} />;
};

const CurrentUserButton: React.FC = () => {
    const currentUser = useCurrentUser();
    const popoverRef = usePopoverRef<HTMLButtonElement>(<CurrentUserDropdown />, {
        placement: 'below',
        justify: 'end',
        centered: true,
        fillWithContent: true,
    });

    if (!currentUser) {
        return null;
    }

    return (
        <button ref={popoverRef}>
            <CurrentUserIcon />
        </button>
    );
};

export default CurrentUserButton;
