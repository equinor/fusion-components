import { createPortal } from 'react-dom';
import { useFusionContext } from '@equinor/fusion';
import { FC } from 'react';

const HeaderContentPortal: FC = ({ children }) => {
    const {
        refs: { headerContent },
    } = useFusionContext();

    if (!headerContent.current) {
        return null;
    }

    return createPortal(children, headerContent.current);
};

export default HeaderContentPortal;
