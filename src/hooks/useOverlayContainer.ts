const overlayId = "fusion-overlay-container";

const overlayChildStyling = `
    #${overlayId} {
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        pointer-events: none;
        z-index: ${Number.MAX_SAFE_INTEGER};
    }

    #${overlayId} > * {
        pointer-events: "all";
    }
`;

let overlayContainer = document.getElementById(`#${overlayId}`);
export default (): HTMLElement => {
    if (!overlayContainer) {
        // Set up styling
        const overlayStyle = document.createElement("style");
        overlayStyle.type = "text/css";
        overlayStyle.appendChild(document.createTextNode(overlayChildStyling));
        document.head.appendChild(overlayStyle);

        // Create and add overlay container
        overlayContainer = document.createElement("div");
        overlayContainer.id = overlayId;

        document.body.appendChild(overlayContainer);
    }

    return overlayContainer;
};
