import { useFusionContext } from '@equinor/fusion';

export default (): HTMLElement | null => {
    const fusionContext = useFusionContext();
    return fusionContext.refs.overlay.current;
};
