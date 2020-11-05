import { createContext, useContext } from 'react';
import { createPortal } from 'react-dom';
import RelativePortalChild from './RelativePortalChild';

const containerId = 'FUSION_COMPONENTS_OVERLAYS_CONTAINER';
const container = ((existing) => {
    if (existing) {
        return existing;
    }

    const element = document.createElement('div');
    element.id = containerId;
    document.body.appendChild(element);

    return element;
})(document.getElementById(containerId));

const RelativePortalContext = createContext();

const RelativePortal = (props) => {
    const parentRelativePortal = useContext(RelativePortalContext);
    return createPortal(
        <RelativePortalChild {...props} parentRelativePortal={parentRelativePortal} />,
        container
    );
};

RelativePortal.displayName = 'RelativePortal';

export default RelativePortal;
