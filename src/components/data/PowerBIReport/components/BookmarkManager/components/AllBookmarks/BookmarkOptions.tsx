import {
    DeleteIcon,
    Dropdown,
    EditIcon,
    IconButton,
    MoreIcon,
    useDropdownController,
} from '@equinor/fusion-components';
import * as React from 'react';
import styles from './styles.less';

type BookmarkOptionsProps = {
    onEdit: () => void;
    onDelete: () => void;
};

const BookmarkOptions: React.FC<BookmarkOptionsProps> = ({ onDelete, onEdit }) => {
    const dropdownController = useDropdownController((ref, isOpen, setIsOpen) => (
        <IconButton
            ref={ref as React.MutableRefObject<HTMLButtonElement>}
            onClick={() => setIsOpen(!isOpen)}
        >
            <MoreIcon />
        </IconButton>
    ));
    const { isOpen, setIsOpen } = dropdownController;

    const select = React.useCallback(
        (onClick: () => void) => {
            onClick();
            if (isOpen) {
                setIsOpen(false);
            }
        },
        [isOpen]
    );
    const onEditClick = React.useCallback(() => select(onEdit), [onEdit, select]);
    const onDeleteClick = React.useCallback(() => select(onDelete), [onDelete, select]);

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
