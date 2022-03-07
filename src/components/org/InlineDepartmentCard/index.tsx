import { createStyles, makeStyles } from '@equinor/fusion-react-styles';
import { FC } from 'react';
import OneEquinorIcon from './OneEquinorIcon';

type InlineDepartmentCardProps = {
    fullDepartmentName: string;
    name: string;
};

const useDepartmentCardStyles = makeStyles(
    createStyles({
        container: {
            display: 'grid',
            gridTemplateColumns: '2rem 1fr',
            alignItems: 'center',
            padding: ' 0.2rem 0 0.2rem 0',
            borderRadius: '4px',
            width: '100%',
            height: '40px',
            background: '#FFFFFF',
        },
        logo: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            width: '100%',
            height: '65%',
        },
        textContainer: {
            marginLeft: '0.25rem',
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
        },
        department: {
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            width: '90%',
            fontSize: '12px',
            lineHeight: '1rem',
            fontWeight: 500,
        },
        name: {
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            width: '90%',
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
                <span className={styles.department}>{departmentName}</span>
                <span className={styles.name}>{personName}</span>
            </div>
        </div>
    );
};

export default InlineDepartmentCard;
