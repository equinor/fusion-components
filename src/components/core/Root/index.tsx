import * as React from "react";

import styles from "./styles.less";

type FusionRootProps = {};

const FusionRoot = React.forwardRef<HTMLDivElement, React.Props<FusionRootProps>>(({ children }, ref) => {
    return (
        <div className={styles.container} ref={ref}>
            {children}
        </div>
    );
});

export default FusionRoot;
