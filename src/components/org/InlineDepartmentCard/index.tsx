import { clsx, createStyles, makeStyles } from '@equinor/fusion-react-styles';
import { FC } from 'react';
import OneEquinorIcon from './OneEquinorIcon';

type InlineDepartmentCardProps = {
    fullDepartmentName: string;
    name: string;
};

const useDepartmentCardStyles = makeStyles(
    () =>
        createStyles({
            container: {
                display: 'flex',
                alignItems: 'center',
                margin: ' 0.2rem 0',
                borderRadius: '4px',
                width: '100%',
                height: '2.5rem',
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
        </div>
    );
};

export default InlineDepartmentCard;
