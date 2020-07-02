import React from 'react';
import {
    PersonDetails,
    useComponentDisplayType,
    useComponentDisplayClassNames,
    ComponentDisplayType,
} from '@equinor/fusion';
import styles from './styles.less';
import classNames from 'classnames';
import ConsultantIcon from './icons/ConsultantIcon';
import ExternalHireIcon from './icons/ExternalHireIcon';
import AffiliateIcon from './icons/AffiliateIcon';
import LockedIcon from './icons/LockedIcon';
import EmployeeIcon from './icons/EmployeeIcon';
import { PhotoSize } from '../PersonCard';
import useTooltipRef from 'hooks/useTooltipRef';

type AccountTypeBageProps = {
    size: PhotoSize;
    currentPerson: PersonDetails;
    hideTooltip?: boolean;
};

const getIconSizes = (isCompact: boolean) => ({
    xlarge: isCompact ? 24 : 24,
    large: isCompact ? 16 : 16,
    medium: isCompact ? 12 : 16,
    small: isCompact ? 8 : 12,
});

const resolveTooltip = (accountType: string, isExternalHire: boolean) => {
    switch (accountType) {
        case 'Local':
            return 'No affiliate access account. User cannot log in to Fusion';
        case 'Employee':
            if (isExternalHire) {
                return 'External hire';
            }
            return 'Equinor employee';
        case 'External':
            return 'Affiliate access';
        case 'Consultant':
            return 'X-External / External with Equinor account';
        default:
            return accountType;
    }
};

const AccountTypeBadge = ({ size, currentPerson, hideTooltip }: AccountTypeBageProps) => {
    const isExternalHire = !!(
        currentPerson.jobTitle && currentPerson.jobTitle.toLowerCase().startsWith('ext')
    );
    const isExternal = currentPerson.accountType === 'External';
    const isConsultant = currentPerson.accountType === 'Consultant';
    const isEmployee = currentPerson.accountType === 'Employee';
    const isLocal = currentPerson.accountType === 'Local';

    const iconClassNames = classNames(styles.iconContainer, useComponentDisplayClassNames(styles), {
        [styles.xlarge]: size === 'xlarge',
        [styles.large]: size === 'large',
        [styles.medium]: size === 'medium',
        [styles.small]: size === 'small',
        [styles.externalHire]: isExternalHire,
        [styles.consultant]: isConsultant,
        [styles.affiliate]: isExternal,
        [styles.local]: isLocal,
        [styles.employee]: isEmployee,
    });

    const displayType = useComponentDisplayType();
    const iconSize = getIconSizes(displayType === ComponentDisplayType.Compact)[size];
    const accountTypeTooltipRef = useTooltipRef(
        hideTooltip ? '' : resolveTooltip(currentPerson.accountType, isExternalHire)
    );

    return (
        <div className={iconClassNames} ref={accountTypeTooltipRef}>
            {isConsultant && <ConsultantIcon width={iconSize} height={iconSize} />}
            {isExternalHire && <ExternalHireIcon width={iconSize} height={iconSize} />}
            {isExternal && <AffiliateIcon width={iconSize} height={iconSize} />}
            {isLocal && <LockedIcon width={iconSize} height={iconSize} />}
            {isEmployee && !isExternalHire && <EmployeeIcon width={iconSize} height={iconSize} />}
        </div>
    );
};

export default AccountTypeBadge;
