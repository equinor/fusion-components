import { createContext, useState, useEffect, createRef } from 'react';
import PropTypes from 'prop-types';
import { findParentWithScroll, isInsideNode } from './helpers';

const RelativePortalContext = createContext();

const i = 999;

const RelativePortalChild = ({
    parentRelativePortal,
    onClickOutside,
    handleOutOfBounds,
    relativeTo,
    children,
}) => {
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const [size, setSize] = useState({ width: 0, height: 0 });
    const [zIndex] = useState(i + 1);
    const [clickedInsideChild, setClickedInsideChild] = useState(false);
    let animationFrame = null;
    const nodeRef = createRef();

    const handleOnChildClick = () => setClickedInsideChild(true);

    const handleOnClick = () => {
        if (parentRelativePortal) {
            parentRelativePortal.onClick();
        }
    };

    const handleClickOutside = (e) => {
        setTimeout(() => {
            const childNodes = Array.from(nodeRef.current.childNodes);

            if (
                clickedInsideChild ||
                childNodes.reduce((isInside, node) => isInside && isInsideNode(node, e), true)
            ) {
                clickedInsideChild(false);
                return;
            }

            if (onClickOutside) {
                onClickOutside(e);
            }
        });
    };

    const updatePositioning = () => {
        const node = relativeTo ? relativeTo.current || relativeTo : null;

        if (!node) {
            return;
        }

        const rect = node.getBoundingClientRect();
        const { top, left } = position;
        const { width, height } = size;

        if (
            rect.top !== top ||
            rect.left !== left ||
            rect.width !== width ||
            rect.height !== height
        ) {
            window.cancelAnimationFrame(animationFrame);
            animationFrame = window.requestAnimationFrame(() => {
                setPosition({
                    top: rect.top,
                    left: rect.left,
                });

                setSize({
                    width: rect.width,
                    height: rect.height,
                });
            });

            if (handleOutOfBounds) {
                const parentWithScroll = findParentWithScroll(node);
                if (parentWithScroll) {
                    const parentOffset = parentWithScroll.getBoundingClientRect().top;
                    const childOffset = node.getBoundingClientRect().top - node.clientHeight;
                    if (parentOffset > childOffset) {
                        handleOutOfBounds();
                    }
                }
            }
        }
    };

    const getContext = () => ({
        onClick: handleOnChildClick,
    });

    useEffect(() => {
        document.addEventListener('scroll', updatePositioning, {passive: true, capture: true});
        window.addEventListener('resize', updatePositioning, {passive: true, capture: true});
        document.addEventListener('click', handleClickOutside, {passive: true});
        updatePositioning();

        return () => {
            document.removeEventListener('scroll', updatePositioning, true);
            window.removeEventListener('resize', updatePositioning, true);
            document.removeEventListener('click', handleClickOutside, false);
            window.cancelAnimationFrame(animationFrame);
        };
    });

    return (
        <RelativePortalContext.Provider value={getContext()}>
            <div
                ref={nodeRef}
                style={{
                    position: 'fixed',
                    overflow: 'visible',
                    pointerEvents: 'none',
                    zIndex,
                    ...position,
                    ...size,
                }}
                onClickCapture={handleOnClick}
            >
                {children}
            </div>
        </RelativePortalContext.Provider>
    );
};

RelativePortalChild.propTypes = {
    parentRelativePortal: PropTypes.node.isRequired,
    onClickOutside: PropTypes.func,
    handleOutOfBounds: PropTypes.func,
    children: PropTypes.node.isRequired,
    relativeTo: PropTypes.oneOf([
        PropTypes.instanceOf(Element),
        PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
    ]).isRequired,
};

RelativePortalChild.defaultProps = {
    onClickOutside: () => {},
    handleOutOfBounds: () => {},
};

RelativePortalChild.displayName = '@fusion/components/utils/RelativePortal/Child';

export default RelativePortalChild;
