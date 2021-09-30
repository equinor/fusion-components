import { act } from 'react-dom/test-utils';
import { shallow } from 'enzyme';
import { hookTestScope } from './hookTestScope';
import useOverlayPortal from '../useOverlayPortal';

// ../__mocks__/useOverlayContainer.ts
jest.mock('../useOverlayContainer');
import useOverlayContainer, { prepend, removeChild } from '../useOverlayContainer';

beforeEach(() => {
    useOverlayContainer.mockClear();
    prepend.mockClear();
    removeChild.mockClear();
});

describe('useOverlayPortal', () => {
    it('Should prepend to the overlay container', () => {
        const content = <div>Oh my</div>;
        hookTestScope(() => {
            useOverlayPortal(true, content);
        });

        expect(useOverlayContainer).toHaveBeenCalledTimes(1);
        expect(prepend).toHaveBeenCalledTimes(1);
        expect(prepend.mock.calls[0][0].innerHTML).toEqual(shallow(content).html());
    });

    it('Should not add to the overlay container if not visible', () => {
        hookTestScope(() => {
            useOverlayPortal(false, <div>Oh my</div>);
        });

        expect(useOverlayContainer).toHaveBeenCalledTimes(1);
        expect(prepend).not.toHaveBeenCalled();
    });

    it('Should remove child when visible is set to false', () => {
        const scope = hookTestScope(
            ({ isVisible }) => {
                useOverlayPortal(isVisible, <div>Oh my</div>);
            },
            { isVisible: true }
        );

        expect(removeChild).not.toHaveBeenCalled();
        expect(prepend).toHaveBeenCalledTimes(1);

        act(() => {
            scope.setProps({ isVisible: false });
        });

        expect(removeChild).toHaveBeenCalled();

        // Assert that the child is not added back in to the overlay container
        expect(prepend).toHaveBeenCalledTimes(1);
    });

    it('Should reprepend when the content change', () => {
        const scope = hookTestScope(
            ({ content }) => {
                useOverlayPortal(true, <div>{content}</div>);
            },
            { content: 'Initial' }
        );

        act(() => {
            scope.setProps({ content: 'Hello there 🙋‍' });
        });

        expect(removeChild).toHaveBeenCalledTimes(1);
        expect(prepend).toHaveBeenCalledTimes(2);
    });
});
