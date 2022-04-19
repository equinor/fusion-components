import { clsx, createStyles, theme, makeStyles } from '@equinor/fusion-react-styles';
import { FC } from 'react';
import OneEquinorIcon from './OneEquinorIcon';
import Icon from '@equinor/fusion-react-icon';

type InlineDepartmentCardProps = {
    fullDepartmentName: string;
    name: string;
    displayLinkIcon?: boolean;
};

const useDepartmentCardStyles = makeStyles(
    () =>
        createStyles({
            container: {
                display: 'flex',
                alignItems: 'center',
                borderRadius: '4px',
                width: '100%',
                height: '2.5rem',
                padding: '0.2rem 0 0.2rem 0',
            },
            logo: {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                flex: 0,
                padding: '0 .2rem',
                width: '2rem',
                height: '2rem',
            },
            iconContainer: {
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                fontSize: '12px',
                color: theme.colors.infographic.primary__moss_green_100.value.hex,
                paddingRight: '0.6rem',
            },
            textContainer: {
                margin: '0 0.25rem',
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                width: '100%',
                overflow: 'hidden',
            },
            ellipsisOverflow: {
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
            },
            department: {
                fontSize: '12px',
                lineHeight: '1rem',
                fontWeight: 500,
            },
            name: {
                fontSize: '10px',
                lineHeight: '12px',
            },
        }),
    { name: 'fusion-components-inline-department-card' }
);

const InlineDepartmentCard: FC<InlineDepartmentCardProps> = ({
    fullDepartmentName: departmentName,
    name: personName,
    displayLinkIcon = false,
}) => {
    const styles = useDepartmentCardStyles();
    return (
        <div className={styles.container}>
            <div className={styles.logo}>
                <OneEquinorIcon />
            </div>

            <div className={styles.textContainer}>
                <span className={clsx(styles.department, styles.ellipsisOverflow)}>
                    {departmentName}
                </span>
                <span className={clsx(styles.name, styles.ellipsisOverflow)}>{personName}</span>
            </div>

            {!!displayLinkIcon && (
                <div className={styles.iconContainer}>
                    <Icon icon={'external_link'} />
                </div>
            )}
        </div>
    );
};

export default InlineDepartmentCard;
