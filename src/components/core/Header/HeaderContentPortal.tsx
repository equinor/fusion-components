import React from 'react';
import { createPortal } from 'react-dom';
import { useFusionContext } from '@equinor/fusion';

const HeaderContentPortal: React.FC = ({ children }) => {
    const {
        refs: { headerContent },
    } = useFusionContext();

    if (!headerContent.current) {
        return null;
    }

    return createPortal(children, headerContent.current);
};

export default HeaderContentPortal;
