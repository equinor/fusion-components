import React, { Component } from "react";
import global from "global";
import document from "global/document";
import { findDOMNode, createPortal } from "react-dom";
import PropTypes from "prop-types";

const RelativePortalContext = React.createContext();

let i = 999;
class RelativePortalChild extends Component {
    state = {
        top: 0, left: 0,
        width: 0, height: 0,
        zIndex: i++,
    };

    componentDidMount = () => {
        document.addEventListener("scroll", this.updatePositioning, true);
        global.addEventListener("resize", this.updatePositioning, true);
        document.addEventListener("click", this.handleClickOutside, false);
        this.updatePositioning();
    }

    componentDidUpdate() {
        this.updatePositioning();
    }

    componentWillUnmount = () => {
        document.removeEventListener("scroll", this.updatePositioning, true);
        global.removeEventListener("resize", this.updatePositioning, true);
        document.removeEventListener("click", this.handleClickOutside, false);
        global.cancelAnimationFrame(this.animationFrame);
    }

    isInsideNode(node, e) {
        const rect = node.getBoundingClientRect();
        return (e.pageX >= rect.left && e.pageX <= rect.right) && (e.pageY >= rect.top && e.pageY <= rect.bottom);
    }

    handleOnChildClick = () => {
        this._clickedInsideChild = true;
    }

    handleOnClick = () => {
        const { parentRelativePortal } = this.props;
        if(parentRelativePortal) {
            parentRelativePortal.onClick();
        }
    }

    handleClickOutside = e => {
        setTimeout(() => {
            const children = Array.from(findDOMNode(this).childNodes);
            if(this._clickedInsideChild || children.reduce((isInside, node) => isInside && this.isInsideNode(node, e), true)) {
                this._clickedInsideChild = false;
                return;
            }

            if(this.props.onClickOutside) {
                this.props.onClickOutside(e);
            }
        });
    }

    findParentWithScroll(node) {
        const parents = (node, parent) => {
            if (node.parentNode === null) {
                return parent;
            }
            return parents(node.parentNode, parent.concat([node]));
        };

        const regex = /(auto|scroll)/;
        const style = (node, prop) => getComputedStyle(node, null).getPropertyValue(prop);
        const overflow = node => style(node, 'overflow') + style(node, 'overflow-y');
        const scroll = node => regex.test(overflow(node));

        const scrollParent = (node) => {
            const parent = parents(node.parentNode, []);
            for (let i = 0; i < parent.length; i += 1) {
                if (scroll(parent[i])) {
                    return parent[i];
                }
            }
            return document.scrollingElement || document.documentElement;
        };
        return scrollParent(node);
    }

    animationFrame = null;
    updatePositioning = () => {
        const node = findDOMNode(this.props.relativeTo);
        const { handleOutOfBounds } = this.props;

        if (!node) {
            return;
        }

        const rect = node.getBoundingClientRect();
        const { top, left, width, height } = this.state;

        if (rect.top !== top || rect.left !== left || rect.width !== width || rect.height !== height) {
            global.cancelAnimationFrame(this.animationFrame);
            this.animationFrame = global.requestAnimationFrame(() => {
                this.setState({
                    top: rect.top,
                    left: rect.left,
                    width: rect.width,
                    height: rect.height,
                });
            });

            if (handleOutOfBounds) {
                const parentWithScroll = this.findParentWithScroll(node);
                if (parentWithScroll) {
                    const parentOffset = parentWithScroll.getBoundingClientRect().top;
                    const childOffset = node.getBoundingClientRect().top - node.clientHeight;
                    if (parentOffset > childOffset) {
                        handleOutOfBounds();
                    }
                }
            }
        }
    }

    getContext() {
        return {
            onClick: this.handleOnChildClick,
        };
    }

    render() {
        return (
            <RelativePortalContext.Provider value={this.getContext()}>
                <div style={{ position: "fixed", overflow: "visible", pointerEvents: "none", ...this.state }} onClickCapture={this.handleOnClick}>
                    {this.props.children}
                </div>
            </RelativePortalContext.Provider>
        );
    }
};

const containerId = "FUSION_COMPONENTS_OVERLAYS_CONTAINER";
const container = (existing => {
    if(existing) {
        return existing;
    }

    const container = document.createElement("div");
    container.id = containerId;
    document.body.appendChild(container);

    return container;
})(document.getElementById(containerId));

export default class RelativePortal extends Component {
    static propTypes = {
        relativeTo: PropTypes.object.isRequired,
        handleClickOutside: PropTypes.func,
    };

    render() {
        return createPortal((
            <RelativePortalContext.Consumer>
                {parentRelativePortal => (
                    <RelativePortalChild {...this.props} parentRelativePortal={parentRelativePortal} />
                )}
            </RelativePortalContext.Consumer>
        ), container);
    }
}