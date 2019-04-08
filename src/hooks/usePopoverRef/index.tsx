import * as React from "react";
import useClickToggleController from "../useClickToggleController";
import useOverlayPortal from "../useOverlayPortal";
import * as styles from "./styles.less";

export default (content: React.ReactNode) : React.Dispatch<HTMLElement> => {
    const [isOpen, ref] = useClickToggleController();

    useOverlayPortal(isOpen, <div className={styles.container}>{content}</div>);
    
    return ref;
};