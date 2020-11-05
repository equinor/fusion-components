import { createPortal } from 'react-dom';
import { useFusionContext } from '@equinor/fusion';

const HeaderAppAsidePortal: React.FC = ({ children }) => {
    const {
        refs: { headerAppAside },
    } = useFusionContext();

    if (!headerAppAside?.current) {
        return null;
    }

    return createPortal(children, headerAppAside.current);
};

export default HeaderAppAsidePortal;
