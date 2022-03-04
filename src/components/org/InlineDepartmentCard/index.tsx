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
            padding: ' 0.2rem 0 0.2rem 0', //maybe remove this?
            borderRadius: '4px',
            width: '100%', //'193px',
            height: '40px', //100%
            background: '#FFFFFF',
        },
        logo: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        textContainer: {
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
            fontWeight: 600,
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
