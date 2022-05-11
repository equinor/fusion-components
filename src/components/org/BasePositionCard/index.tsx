import { BasePosition } from '@equinor/fusion';
import { MarkdownViewer } from '@equinor/fusion-components';
import Divider from '@equinor/fusion-react-divider';
import { createStyles, makeStyles, theme } from '@equinor/fusion-react-styles';
import { useMemo } from 'react';

export const useStyles = makeStyles(
    createStyles({
        container: {
            borderRadius: '4px',
            display: 'flex',
            flexDirection: 'column',
            gap: '1em',
            minWidth: '500px',
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

    const requestTypes = `${position.settings?.directAssignmentEnabled ? 'Direct Request' : ''}`;
    const competanceCenter = 'N/A';
    const status = (position as any).inactive ? 'Disabled' : 'Enabled';
    const roleDescription = useMemo(() => {
        const pos = position as any;
        if (
            !pos.roleDescription ||
            !pos.roleDescription.content ||
            pos.roleDescription.content.length < 1
        )
            return 'No description provided';
        return pos.roleDescription.content;
    }, [position]);

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
                    <span> {competanceCenter} </span>
                </div>
                <div className={styles.textContainer}>
                    <span className={styles.labelText}>Status</span>
                    <span> {status} </span>
                </div>
            </div>
            <div className={styles.textContainer}>
                <span className={styles.labelText}>Supports Request types</span>
                <span> {requestTypes} </span>
            </div>
            <div className={styles.roleDescription}>
                <span className={styles.headerText}> Role and Responsibilities</span>
                <MarkdownViewer markdown={roleDescription}></MarkdownViewer>
            </div>
        </div>
    );
};

export default BasePositionCard;
