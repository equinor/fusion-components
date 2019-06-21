import * as React from 'react';
import styles from './styles.less';

import FusionContainer from "../Container";

type FusionRootProps = {
    rootRef: React.MutableRefObject<HTMLElement | null>;
    overlayRef: React.MutableRefObject<HTMLElement | null>;
};

const FusionRoot: React.FC<FusionRootProps> = (
    ({ children, rootRef, overlayRef }) => {
        return (
            <div className={styles.container}>
                <FusionContainer ref={rootRef as React.MutableRefObject<HTMLDivElement>}>
                    {children}
                </FusionContainer>
                <div className={styles.overlay} ref={overlayRef as React.MutableRefObject<HTMLDivElement>}></div>
            </div>
        );
    }
);

export default FusionRoot;
