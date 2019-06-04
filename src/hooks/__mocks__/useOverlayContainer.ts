export const prepend = jest.fn();
export const removeChild = jest.fn();

const useOverlayContainer = jest.fn();
useOverlayContainer.mockReturnValue({
    prepend,
    removeChild,
});

export default useOverlayContainer;
