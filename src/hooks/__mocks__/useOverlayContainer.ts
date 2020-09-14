export const appendChild = jest.fn();
export const removeChild = jest.fn();

const useOverlayContainer = jest.fn();
useOverlayContainer.mockReturnValue({
    appendChild,
    removeChild,
});

export default useOverlayContainer;
