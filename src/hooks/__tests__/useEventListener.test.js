import { hookTestScope } from './hookTestScope';
import useEventListener from '../useEventListener';

const node = {
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
};

beforeEach(() => {
    node.addEventListener.mockClear();
    node.removeEventListener.mockClear();
});

describe('useEventListener', () => {
    it('Should call addEventListener on the node', () => {
        const handler = jest.fn();
        const eventName = 'click';

        hookTestScope(() => {
            useEventListener(node, eventName, handler, []);
        });

        expect(node.addEventListener).toHaveBeenCalledTimes(1);
        expect(node.addEventListener).toHaveBeenCalledWith(eventName, handler, false);
    });

    it('Should call removeEventListener on unmount', () => {
        const handler = jest.fn();
        const eventName = 'click';

        const scope = hookTestScope(() => {
            useEventListener(node, eventName, handler, []);
        });

        scope.unmount();

        expect(node.removeEventListener).toHaveBeenCalledTimes(1);
        expect(node.removeEventListener).toHaveBeenCalledWith(eventName, handler, false);
    });

    it('Should not call removeEventListener before unmount', () => {
        const handler = jest.fn();
        const eventName = 'click';

        const scope = hookTestScope(() => {
            useEventListener(node, eventName, handler, []);
        });

        expect(node.removeEventListener).not.toHaveBeenCalled();

        scope.unmount();

        expect(node.removeEventListener).toHaveBeenCalledTimes(1);
        expect(node.removeEventListener).toHaveBeenCalledWith(eventName, handler, false);
    });

    it('Should re-attach event listener when a dependency changes', () => {
        const firstHandler = jest.fn();
        const secondHandler = jest.fn();
        const eventName = 'click';

        const scope = hookTestScope(
            ({ handler }) => {
                useEventListener(node, eventName, handler, [handler]);
            },
            { handler: firstHandler }
        );

        expect(node.addEventListener).toHaveBeenCalledTimes(1);
        expect(node.removeEventListener).not.toHaveBeenCalled();

        scope.setProps({ handler: secondHandler });

        expect(node.addEventListener).toHaveBeenCalledTimes(2);
        expect(node.addEventListener).toHaveBeenCalledWith(eventName, firstHandler, false);
        expect(node.addEventListener).toHaveBeenCalledWith(eventName, secondHandler, false);

        expect(node.removeEventListener).toHaveBeenCalledTimes(1);
        expect(node.removeEventListener).toHaveBeenCalledWith(eventName, firstHandler, false);
    });

    it('Should default to useCapture = false', () => {
        const handler = jest.fn();
        const eventName = 'click';

        hookTestScope(() => {
            useEventListener(node, eventName, handler, []);
        });

        expect(node.addEventListener).toHaveBeenCalledWith(
            eventName,
            handler,
            false // useCapture
        );
    });

    it('Should respect useCapture when passed', () => {
        const handler = jest.fn();
        const eventName = 'click';

        hookTestScope(() => {
            useEventListener(node, eventName, handler, [], true);
        });

        expect(node.addEventListener).toHaveBeenCalledWith(
            eventName,
            handler,
            true // useCapture
        );
    });

    it('Should handle undefined node', () => {
        expect(() => {
            hookTestScope(() => {
                useEventListener(null, 'click', () => {});
            });
        }).not.toThrow();
    });
});
