import { useStyles } from '../Options.style';
import { EditIcon, DeleteIcon } from '@equinor/fusion-components';
// TODO: replace with FusionIcon
import '@equinor/fusion-wc-icon';
type OwnerOptionsProps = {
    onEditClick: () => void;
    onDeleteClick: () => void;
    handleSharingClick: (share: boolean) => void;
    isShared: boolean;
};
export const OwnerOptions = ({
    handleSharingClick,
    isShared,
    onDeleteClick,
    onEditClick,
}: OwnerOptionsProps): JSX.Element => {
    const styles = useStyles();
    return (
        <div className={styles.menuContainer}>
            <div className={styles.menuItem} onClick={onEditClick} key="edit">
                <div className={styles.icon}>
                    <EditIcon outline />
                </div>
                <span className={styles.label}>Edit bookmark</span>
            </div>
            <div className={styles.menuItem} key="delete" onClick={onDeleteClick}>
                <div className={styles.icon}>
                    <DeleteIcon outline />
                </div>
                <span className={styles.label}>Delete bookmark</span>
            </div>
            <div className={styles.menuItem} key="share" onClick={() => handleSharingClick(true)}>
                <div className={styles.icon}>
                    <fwc-icon icon="share" />
                </div>
                <span className={styles.label}>{isShared ? 'Copy URL' : 'Share URL'}</span>
            </div>
            {isShared && (
                <div
                    className={styles.menuItem}
                    key="unshare"
                    onClick={() => handleSharingClick(false)}
                >
                    <div className={styles.icon}>
                        <fwc-icon icon="share" />
                    </div>
                    <span className={styles.label}>Unshare URL</span>
                </div>
            )}
        </div>
    );
};

export default OwnerOptions;
