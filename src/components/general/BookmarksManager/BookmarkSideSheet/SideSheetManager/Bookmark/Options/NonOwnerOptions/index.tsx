import styles from '../styles.less';
import { DeleteIcon } from '@equinor/fusion-components';
type NonOwnerOptionsProps = {
    onRemoveClick: () => void;
};
function NonOwnerOptions({ onRemoveClick }: NonOwnerOptionsProps) {
    return (
        <div className={styles.menuContainer}>
            <div className={styles.menuItem} key="remove" onClick={onRemoveClick}>
                <div className={styles.icon}>
                    <DeleteIcon outline />
                </div>
                <span className={styles.label}>Remove bookmark</span>
            </div>
        </div>
    );
}
export default NonOwnerOptions;
