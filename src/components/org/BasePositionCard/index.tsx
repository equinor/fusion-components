import { BasePosition } from '@equinor/fusion';
import Divider from '@equinor/fusion-react-divider';
import { createStyles, makeStyles, theme } from '@equinor/fusion-react-styles';

export const useStyles = makeStyles(
    createStyles({
        container: {
            borderRadius: '4px',
            display: 'flex',
            flexDirection: 'column',
            gap: '1em',
        },
        headerText: {
            fontSize: '16px',
            fontWeight: 'bold',
        },
        horizontalContainer: {
            display: 'flex',
            flexDirection: 'row',
            gap: '1em',
        },
        textContainer: {
            margin: '0 0.25rem',
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: '0.5em',
        },
        labelText: {
            fontSize: '12px',
            color: theme.colors.text.static_icons__tertiary.value.hex,
        },
        roleDescription: {
            paddingTop: '1em',
        },
    })
);

interface BasePositionCardProps {
    position: BasePosition;
}

const BasePositionCard: React.FC<BasePositionCardProps> = ({ position }) => {
    const styles = useStyles();

    const requestTypes = position.settings;

    return (
        <div className={styles.container}>
            <div className={styles.headerText}>
                {position.name} - {position.discipline}
                <Divider />
            </div>
            <div className={styles.horizontalContainer}>
                <div className={styles.textContainer}>
                    <span className={styles.labelText}>Department Owner</span>
                    <span>{position.department}</span>
                </div>
                <div className={styles.textContainer}>
                    <span className={styles.labelText}>Competence Center</span>
                    <span> NA </span>
                </div>
                <div className={styles.textContainer}>
                    <span className={styles.labelText}>Status</span>
                    <span> Enabled </span>
                </div>
            </div>
            <div className={styles.textContainer}>
                <span className={styles.labelText}>Supports Request types</span>
                <span> Direct Requests</span>
            </div>
            <div className={styles.roleDescription}>
                <span className={styles.headerText}> Role and Responsibilities</span>
                <p> {position.roleDescription}</p>
            </div>
        </div>
    );
};

export default BasePositionCard;
