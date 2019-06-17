import * as React from 'react';
import useHoverToggleController from '../useHoverToggleController';
import useOverlayPortal from '../useOverlayPortal';
import * as styles from './styles.less';

export default (content: String, delay: Number): React.MutableRefObject<any> => {
    const [isOpen, ref] = useHoverToggleController(delay);

    useOverlayPortal(isOpen, <div className={styles.container}>{content}</div>);

    return ref;
};
