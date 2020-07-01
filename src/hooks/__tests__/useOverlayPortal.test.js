import * as React from 'react';
import { act } from 'react-dom/test-utils';
import { shallow } from 'enzyme';
import { hookTestScope } from './hookTestScope';
import useOverlayPortal from '../useOverlayPortal';

// ../__mocks__/useOverlayContainer.ts
jest.mock('../useOverlayContainer');
import useOverlayContainer, { appendChild } from '../useOverlayContainer';

beforeEach(() => {
    useOverlayContainer.mockClear();
    appendChild.mockClear();
});

describe('useOverlayPortal', () => {
    it('Should appendChild to the overlay container', () => {
        const content = <div>Oh my</div>;
        hookTestScope(() => {
            useOverlayPortal(true, content);
        });

        expect(appendChild).toHaveBeenCalledTimes(1);
        expect(appendChild.mock.calls[0][0].innerHTML).toEqual(shallow(content).html());
    });

    it('Should not add to the overlay container if not visible', () => {
        hookTestScope(() => {
            useOverlayPortal(false, <div>Oh my</div>);
        });

        expect(useOverlayContainer).toHaveBeenCalledTimes(1);
        expect(appendChild).not.toHaveBeenCalled();
    });
});
