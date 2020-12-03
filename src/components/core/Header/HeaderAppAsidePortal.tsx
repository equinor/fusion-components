import { createPortal } from 'react-dom';
import { useFusionContext } from '@equinor/fusion';
import { FC } from 'react';

const HeaderAppAsidePortal: FC = ({ children }) => {
    const {
        refs: { headerAppAside },
    } = useFusionContext();

    if (!headerAppAside?.current) {
        return null;
    }

    return createPortal(children, headerAppAside.current);
};

export default HeaderAppAsidePortal;
