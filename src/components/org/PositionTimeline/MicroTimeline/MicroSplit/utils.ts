export const addLineMargin = (
    position: number,
    isRotation: boolean,
    horizontal: 'start' | 'end'
) => {
    const offset = isRotation ? (horizontal === 'start' ? '5px' : '2px') : '0px';
    return `calc(${position}% + ${offset})`;
};
