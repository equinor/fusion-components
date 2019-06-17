import * as React from 'react';
import { hookTestScope } from './hookTestScope';
import useClickOutsideOverlayPortal from '../useClickOutsideOverlayPortal';
import useOverlayPortal from '../useOverlayPortal';

describe('useClickOutsideOverlayPortal', () => {
    it('Should trigger on click outside overlay portal', () => {
        const handler = jest.fn();
        hookTestScope(() => {
            useClickOutsideOverlayPortal(handler);
        });

        global.document.body.dispatchEvent(new Event('click'));

        expect(handler).toHaveBeenCalledTimes(1);
    });

    it('Should not trigger on click inside overlay portal', () => {
        const handler = jest.fn();

        hookTestScope(() => {
            useClickOutsideOverlayPortal(handler);
            useOverlayPortal(true, <div id="click-me" />);
        });

        const target = document.body.querySelector('#click-me');
        target.dispatchEvent(new Event('click', { bubbles: true }));

        expect(handler).not.toHaveBeenCalled();
    });

    it('Should trigger on click on other children within the overlay portal', () => {
        const clickMeHandler = jest.fn();
        const closeMeHandler = jest.fn();
        let clickMeRef;

        const scope = hookTestScope(() => {
            clickMeRef = React.useRef(null);
            const closeMeRef = React.useRef(null);
            useOverlayPortal(true, <div ref={clickMeRef} id="click-me" />);
            useOverlayPortal(true, <div ref={closeMeRef} id="close-me" />);

            useClickOutsideOverlayPortal(clickMeHandler, clickMeRef.current);
            useClickOutsideOverlayPortal(closeMeHandler, closeMeRef.current);
        });

        // Rerender to set refs
        scope.update();

        const clickMeTarget = document.body.querySelector('#click-me');
        clickMeTarget.dispatchEvent(new Event('click', { bubbles: true }));

        expect(closeMeHandler).toHaveBeenCalled();
        expect(clickMeHandler).not.toHaveBeenCalled();
    });
});
