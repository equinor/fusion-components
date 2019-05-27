import React from 'react';
import PropTypes from 'prop-types';
import RelativePortal from 'components/utils/RelativePortal';
import PopoverContent from './components/Content';
import { popoverHorizontalPositions, popoverVerticalPositions } from './positioning';

export { popoverHorizontalPositions, popoverVerticalPositions };

const Popover = ({
    isOpen,
    onClose,
    relativeTo,
    horizontalPosition,
    verticalPosition,
    inset,
    children,
}) => {
    if (!isOpen) {
        return null;
    }

    const renderPopover = () => (
        <PopoverContent
            horizontalPosition={horizontalPosition}
            verticalPosition={verticalPosition}
            inset={inset}
            isRelative={!!relativeTo}
        >
            {children}
        </PopoverContent>
    );

    const close = () => {
        if (onClose) {
            onClose();
        }
    };

    const handleClickOutside = () => {
        if (isOpen) {
            setTimeout(() => close());
        }
    };

    if (!relativeTo) {
        return renderPopover();
    }

    return (
        <RelativePortal relativeTo={relativeTo} onClickOutside={handleClickOutside}>
            {renderPopover()}
        </RelativePortal>
    );
};

Popover.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    relativeTo: PropTypes.oneOf([
        PropTypes.instanceOf(Element),
        PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
    ]),
    horizontalPosition: PropTypes.oneOf(Object.values(popoverHorizontalPositions)),
    verticalPosition: PropTypes.oneOf(Object.values(popoverVerticalPositions)),
    inset: PropTypes.bool,
    children: PropTypes.node.isRequired,
};

Popover.defaultProps = {
    inset: false,
    relativeTo: null,
    horizontalPosition: popoverHorizontalPositions.left,
    verticalPosition: popoverVerticalPositions.bottom,
};

Popover.displayName = 'Popover';

export default Popover;
