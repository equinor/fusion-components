import { createContext, useContext } from 'react';

type PositionPickerContex = {
    allowFuture: boolean;
    allowPast: boolean;
};

export const PositionPickerContex = createContext<PositionPickerContex>({
    allowFuture: false,
    allowPast: false,
});

export const usePositionPickerContext = () => useContext(PositionPickerContex);
