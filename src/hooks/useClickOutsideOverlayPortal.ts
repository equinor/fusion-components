import useEventListener from './useEventListener';
import { useFusionContext } from '@equinor/fusion';

export default (callback: EventListener, ...targets: Array<HTMLElement | null>): void => {
    const fusionContext = useFusionContext();

    const handleClick: EventListener = e => {
        const relevantTargets = targets.filter(t => t);
        const clickedOutsideTarget = relevantTargets.map(target => target && target !== e.target && !target.contains(e.target as Node)).filter(hit => hit).length === relevantTargets.length;

        if (clickedOutsideTarget) {
            callback(e);
        }
    };

    useEventListener(fusionContext.refs.root.current, 'click', handleClick, [callback, ...targets]);
};
