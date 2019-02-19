import React, { Component } from "react";
import { findDOMNode } from "react-dom";
import PropTypes from "prop-types";
import { findParentWithScroll, isInsideNode } from "./helpers";

const RelativePortalContext = React.createContext();

let i = 999;
export default class RelativePortalChild extends Component {
    static propTypes = {
        parentRelativePortal: PropTypes.node.isRequired,
        onClickOutside: PropTypes.func,
        handleOutOfBounds: PropTypes.func,
        children: PropTypes.node.isRequired,
        relativeTo: PropTypes.node.isRequired,
    };

    static defaultProps = {
        onClickOutside: () => {},
        handleOutOfBounds: () => {},
    };

    state = {
        top: 0,
        left: 0,
        width: 0,
        height: 0,
        zIndex: i += 1,
    };

    animationFrame = null;

    componentDidMount = () => {
        document.addEventListener("scroll", this.updatePositioning, true);
        window.addEventListener("resize", this.updatePositioning, true);
        document.addEventListener("click", this.handleClickOutside, false);
        this.updatePositioning();
    };

    componentDidUpdate() {
        this.updatePositioning();
    }

    componentWillUnmount = () => {
        document.removeEventListener("scroll", this.updatePositioning, true);
        window.removeEventListener("resize", this.updatePositioning, true);
        document.removeEventListener("click", this.handleClickOutside, false);
        window.cancelAnimationFrame(this.animationFrame);
    };

    getContext() {
        return {
            onClick: this.handleOnChildClick,
        };
    }

    handleOnChildClick = () => {
        this.clickedInsideChild = true;
    };

    handleOnClick = () => {
        const { parentRelativePortal } = this.props;
        if (parentRelativePortal) {
            parentRelativePortal.onClick();
        }
    };

    handleClickOutside = e => {
        const { onClickOutside } = this.props;
        setTimeout(() => {
            const children = Array.from(this.node.childNodes);
            if (
                this.clickedInsideChild ||
                children.reduce(
                    (isInside, node) => isInside && isInsideNode(node, e),
                    true
                )
            ) {
                this.clickedInsideChild = false;
                return;
            }

            if (onClickOutside) {
                onClickOutside(e);
            }
        });
    };

    updatePositioning = () => {
        const { handleOutOfBounds, relativeTo } = this.props;
        // eslint-disable-next-line react/no-find-dom-node
        const node = findDOMNode(relativeTo);

        if (!node) {
            return;
        }

        const rect = node.getBoundingClientRect();
        const { top, left, width, height } = this.state;

        if (
            rect.top !== top ||
            rect.left !== left ||
            rect.width !== width ||
            rect.height !== height
        ) {
            window.cancelAnimationFrame(this.animationFrame);
            this.animationFrame = window.requestAnimationFrame(() => {
                this.setState({
                    top: rect.top,
                    left: rect.left,
                    width: rect.width,
                    height: rect.height,
                });
            });

            if (handleOutOfBounds) {
                const parentWithScroll = findParentWithScroll(node);
                if (parentWithScroll) {
                    const parentOffset = parentWithScroll.getBoundingClientRect()
                        .top;
                    const childOffset =
                        node.getBoundingClientRect().top - node.clientHeight;
                    if (parentOffset > childOffset) {
                        handleOutOfBounds();
                    }
                }
            }
        }
    };

    render() {
        const { children } = this.props;
        return (
            <RelativePortalContext.Provider value={this.getContext()}>
                <div
                    ref={node => {
                        this.node = node;
                    }}
                    style={{
                        position: "fixed",
                        overflow: "visible",
                        pointerEvents: "none",
                        ...this.state,
                    }}
                    onClickCapture={this.handleOnClick}
                >
                    {children}
                </div>
            </RelativePortalContext.Provider>
        );
    }
}
