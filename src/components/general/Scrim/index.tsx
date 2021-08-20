import classNames from 'classnames';
import styles from './styles.less';
import { FC, ReactNode, MouseEvent, useState, useRef, useCallback } from 'react';

type ScrimProps = {
    children: ReactNode;
    show?: boolean;
    onClick?: (event: MouseEvent<HTMLDivElement>) => void;
};

const Scrim: FC<ScrimProps> = ({ children, show, onClick }) => {
    const [mouseDownTarget, setMouseDownTarget] = useState({});
    const [mouseUpTarget, setMouseUpTarget] = useState({});

    const ref = useRef<HTMLDivElement | null>(null);
    const scrimClassNames = classNames(styles.scrim, {
        [styles.show]: show,
    });

    const handleClick = useCallback(
        (e: MouseEvent<HTMLDivElement>) => {
            if (
                (mouseUpTarget as Node).isEqualNode(mouseDownTarget as Node) &&
                (ref.current as Node).isEqualNode(e.target as Node)
            ) {
                onClick(e);
            }
        },
        [onClick, mouseUpTarget, mouseDownTarget]
    );
    return (
        <div
            ref={ref}
            className={scrimClassNames}
            onClick={(e) => handleClick(e)}
            onMouseDown={(e) => setMouseDownTarget(e.target)}
            onMouseUp={(e) => setMouseUpTarget(e.target)}
        >
            {children}
        </div>
    );
};
export default Scrim;
