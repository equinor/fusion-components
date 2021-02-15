import {
    DeleteIcon,
    Dropdown,
    EditIcon,
    IconButton,
    MoreIcon,
    useDropdownController,
} from '@equinor/fusion-components';
import { useCallback, useEffect, FC, MutableRefObject } from 'react';
import styles from './styles.less';

type BookmarkOptionsProps = {
    onEdit: () => void;
    onDelete: () => void;
    accordionOpen?: boolean;
};

const BookmarkOptions: FC<BookmarkOptionsProps> = ({ onDelete, onEdit, accordionOpen }) => {
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

    return (
        <div>
            <Dropdown controller={dropdownController}>
                <div className={styles.menuContainer}>
                    <div className={styles.menuItem} key={'edit'} onClick={onEditClick}>
                        <div className={styles.icon}>
                            <EditIcon outline />
                        </div>
                        <span className={styles.label}>Edit name</span>
                    </div>
                    <div className={styles.menuItem} key={'delete'} onClick={onDeleteClick}>
                        <div className={styles.icon}>
                            <DeleteIcon outline />
                        </div>
                        <span className={styles.label}>Delete bookmark</span>
                    </div>
                </div>
            </Dropdown>
        </div>
    );
};

export default BookmarkOptions;
