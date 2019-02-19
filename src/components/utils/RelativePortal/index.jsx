import React, { Component } from "react";
import { createPortal } from "react-dom";
import RelativePortalChild from "./RelativePortalChild";

const containerId = "FUSION_COMPONENTS_OVERLAYS_CONTAINER";
const container = (existing => {
    if (existing) {
        return existing;
    }

    const element = document.createElement("div");
    element.id = containerId;
    document.body.appendChild(element);

    return element;
})(document.getElementById(containerId));

const RelativePortalContext = React.createContext();

export default class RelativePortal extends Component {
    render() {
        return createPortal(
            <RelativePortalContext.Consumer>
                {parentRelativePortal => (
                    <RelativePortalChild
                        {...this.props}
                        parentRelativePortal={parentRelativePortal}
                    />
                )}
            </RelativePortalContext.Consumer>,
            container
        );
    }
}
