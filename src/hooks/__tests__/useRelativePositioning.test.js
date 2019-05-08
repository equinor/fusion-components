import { useRef } from "react";
import { act } from "react-dom/test-utils";
import { hookTestScope } from "./hookTestScope";
import useRelativePositioning from "../useRelativePositioning";
import { is } from "immutable";

const mockedRef = {
    current: {
        getBoundingClientRect: jest.fn(),
    },
};

beforeEach(() => {
    mockedRef.current.getBoundingClientRect.mockClear();
});

describe("useRelativePositioning", () => {
    it("Should default to blank rect if ref.current is not set", () => {
        let rect;

        hookTestScope(() => {
            rect = useRelativePositioning({ current: null });
        });

        expect(rect).toEqual({
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            width: 0,
            height: 0,
        });
    });

    it("Should get the rect of ref.current on mount if set", () => {
        let rect;
        const mockRect = {
            left: 1,
            right: 2,
            top: 3,
            bottom: 4,
            width: 5,
            height: 6,
        };
        mockedRef.current.getBoundingClientRect.mockReturnValueOnce(mockRect);

        hookTestScope(() => {
            rect = useRelativePositioning(mockedRef);
        });

        expect(rect).toEqual(mockRect);
    });

    it("Should get client rect on window resize", () => {
        hookTestScope(() => {
            useRelativePositioning(mockedRef);
        });

        expect(mockedRef.current.getBoundingClientRect).toHaveBeenCalledTimes(1);

        act(() => {
            global.window.resizeTo(1337, 1337);
        });

        expect(mockedRef.current.getBoundingClientRect).toHaveBeenCalledTimes(2);
    });

    it("Should get client rect on scroll", () => {
        hookTestScope(() => {
            useRelativePositioning(mockedRef);
        });

        expect(mockedRef.current.getBoundingClientRect).toHaveBeenCalledTimes(1);

        act(() => {
            global.document.body.scrollTo(1337, 1337);
        });

        expect(mockedRef.current.getBoundingClientRect).toHaveBeenCalledTimes(2);
    });

    is("Should update when the ref updates", () => {
        let ref;

        hookTestScope(() => {
            ref = useRef(mockedRef.current);
            useRelativePositioning(ref);
        });

        expect(mockedRef.current.getBoundingClientRect).toHaveBeenCalledTimes(1);

        const newRef = {
            getBoundingClientRect: jest.fn(),
        };

        act(() => {
            ref(newRef);
        });

        expect(mockedRef.current.getBoundingClientRect).toHaveBeenCalledTimes(1);
        expect(newRef.getBoundingClientRect).toHaveBeenCalledTimes(1);
    });
});
