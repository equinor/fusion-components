import { BookmarkResponse, useCurrentPersonDetails } from '@equinor/fusion';
import { Dropdown, IconButton, MoreIcon, useDropdownController } from '@equinor/fusion-components';
import { MutableRefObject, useCallback, useEffect } from 'react';
import NonOwnerOptions from './NonOwnerOptions';
import OwnerOptions from './OwnerOptions';
type OptionsProps = {
    onEdit: () => void;
    onDelete: () => void;
    onShare: (share: boolean) => void;
    onRemove: () => void;
    accordionOpen?: boolean;
    bookmarkInfo: Pick<BookmarkResponse, 'isShared' | 'createdBy'>;
};
function Options({
    onEdit,
    onDelete,
    onShare,
    onRemove,
    accordionOpen,
    bookmarkInfo,
}: OptionsProps) {
    const { personDetails } = useCurrentPersonDetails();
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
        [isOpen, setIsOpen]
    );

    const onEditClick = useCallback(() => select(onEdit), [onEdit, select]);
    const onDeleteClick = useCallback(() => select(onDelete), [onDelete, select]);
    const onRemoveClick = useCallback(() => select(onRemove), [select, onRemove]);
    const handleSharingClick = useCallback(
        (share: boolean) => {
            onShare(share);
            if (isOpen) {
                setIsOpen(false);
            }
        },
        [isOpen, onShare, setIsOpen]
    );

    useEffect(() => {
        if (!accordionOpen) {
            setIsOpen(false);
        }
    }, [accordionOpen, setIsOpen]);

    return (
        <div>
            <Dropdown controller={dropdownController}>
                {bookmarkInfo.createdBy.azureUniqueId === personDetails?.azureUniqueId ? (
                    <OwnerOptions
                        handleSharingClick={handleSharingClick}
                        isShared={bookmarkInfo.isShared}
                        onDeleteClick={onDeleteClick}
                        onEditClick={onEditClick}
                    />
                ) : (
                    <NonOwnerOptions onRemoveClick={onRemoveClick} />
                )}
            </Dropdown>
        </div>
    );
}

export default Options;
