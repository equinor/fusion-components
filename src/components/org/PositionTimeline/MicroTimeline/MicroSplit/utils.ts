export const addRotationMargin = (position: number, isRotation: boolean) =>
    `calc(${position}% + ${isRotation ? '.5rem' : '0px'})`;
