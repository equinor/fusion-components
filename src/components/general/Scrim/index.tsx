import { FC, ReactNode, MouseEvent } from 'react';
import classNames from 'classnames';
import styles from './styles.less';

type ScrimProps = {
    children: ReactNode;
    show?: boolean;
    onClick?: (event: MouseEvent<HTMLDivElement>) => void;
};

const Scrim: FC<ScrimProps> = ({ children, show, onClick }) => {
    const scrimClassNames = classNames(styles.scrim, {
        [styles.show]: show,
    });

    return (
        <div className={scrimClassNames} onClick={onClick}>
            {children}
        </div>
    );
};
export default Scrim;
