import { hookTestScope } from './hookTestScope';
import useOverlayContainer from '../useOverlayContainer';

describe('useOverlayContainer', () => {
    it('Should return the same instance every time', () => {
        hookTestScope(() => {
            const firstContainer = useOverlayContainer();
            const secondContainer = useOverlayContainer();
            const thirdContainer = useOverlayContainer();

            expect(firstContainer).toBe(secondContainer);
            expect(secondContainer).toBe(thirdContainer);
        });
    });
});
