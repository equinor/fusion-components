import { useCurrentUser } from '@equinor/fusion';
import {
    Dropdown,
    IconButton,
    MoreIcon,
    useDropdownController,
    EditIcon,
    DeleteIcon,
    ShareIcon,
} from '@equinor/fusion-components';
import { MutableRefObject, useCallback, useEffect } from 'react';
import styles from './styles.less';
type OptionsProps = {
    onEdit: () => void;
    onDelete: () => void;
    onShare: () => void;
    accordionOpen?: boolean;
    bookmarkInfo: {
        isShared: boolean;
        bookmarkId: string;
    };
};
function Options({ onEdit, onDelete, accordionOpen, bookmarkInfo, onShare }: OptionsProps) {
    const { id } = useCurrentUser();
    const dropdownController = useDropdownController((ref, isOpen, setIsOpen) => (
        <IconButton
            ref={ref as MutableRefObject<HTMLButtonElement>}
            onClick={() => setIsOpen(!isOpen)}
        >
            <MoreIcon />
        </IconButton>
    ));

    const { isOpen, setIsOpen } = dropdownController;

    const select = useCallback(
        (onClick: () => void) => {
            onClick();
            if (isOpen) {
                setIsOpen(false);
            }
        },
        [isOpen]
    );

    useEffect(() => {
        if (!accordionOpen) {
            setIsOpen(false);
        }
    }, [accordionOpen]);

    const onEditClick = useCallback(() => select(onEdit), [onEdit, select]);
    const onDeleteClick = useCallback(() => select(onDelete), [onDelete, select]);
    const onShareClick = useCallback(() => select(onShare), [onDelete, select]);

    return (
        <div>
            <Dropdown controller={dropdownController}>
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
                    <div className={styles.menuItem} key="share" onClick={onShareClick}>
                        <div className={styles.icon}>
                            <ShareIcon />
                        </div>
                        <span className={styles.label}>Share URL</span>
                    </div>
                    {bookmarkInfo.isShared && (
                        <div className={styles.menuItem} key="share" onClick={onShareClick}>
                            <div className={styles.icon}>
                                <ShareIcon />
                            </div>
                            <span className={styles.label}>Unshare URL</span>
                        </div>
                    )}
                </div>
            </Dropdown>
        </div>
    );
}

export default Options;
