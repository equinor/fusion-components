import { useFusionContext } from '@equinor/fusion';
import useEventListener from './useEventListener';

const useClickOutside = (callback: EventListener, target: HTMLElement | null) => {
    const fusionContext = useFusionContext();

    const handleClick: EventListener = e => {
        if(!target) {
            return;
        }
        
        const mouseEvent = e as MouseEvent;
        const clickedElement = document.elementFromPoint(mouseEvent.pageX, mouseEvent.pageY);
        if(!target.contains(clickedElement)) {
            callback(e);
        }
    }

    useEventListener(fusionContext.refs.root.current, 'click', handleClick, [callback, target]);
};

export default useClickOutside;