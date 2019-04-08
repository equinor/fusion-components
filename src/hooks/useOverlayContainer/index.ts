import * as styles from "./styles.less";

let overlayContainer = document.getElementById(styles.container);
export default () : HTMLElement => {
    if(!overlayContainer) {
        overlayContainer = document.createElement("div");
        overlayContainer.id = styles.container;
        document.body.appendChild(overlayContainer);
    }

    return overlayContainer;
}