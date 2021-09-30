import { useMemo } from 'react';

export type StringMaskToken = {
    mask: string;
    matchValue: (char: string) => boolean;
};

const maskTokens: StringMaskToken[] = [
    {
        mask: '0',
        matchValue: (char: string) => char.match(/^0{1}$/gim) !== null,
    },
    {
        mask: '1',
        matchValue: (char: string) => char.match(/^[0-1]{1}$/gim) !== null,
    },
    {
        mask: '2',
        matchValue: (char: string) => char.match(/^[0-2]{1}$/gim) !== null,
    },
    {
        mask: '3',
        matchValue: (char: string) => char.match(/^[0-3]{1}$/gim) !== null,
    },
    {
        mask: '4',
        matchValue: (char: string) => char.match(/^[0-4]{1}$/gim) !== null,
    },
    {
        mask: '5',
        matchValue: (char: string) => char.match(/^[0-5]{1}$/gim) !== null,
    },
    {
        mask: '6',
        matchValue: (char: string) => char.match(/^[0-6]{1}$/gim) !== null,
    },
    {
        mask: '7',
        matchValue: (char: string) => char.match(/^[0-7]{1}$/gim) !== null,
    },
    {
        mask: '8',
        matchValue: (char: string) => char.match(/^[0-8]{1}$/gim) !== null,
    },
    {
        mask: '9',
        matchValue: (char: string) => char.match(/^[0-9]{1}$/gim) !== null,
    },
    {
        mask: 'A',
        matchValue: (char: string) => char.match(/^[A-Z]{1}$/gim) !== null,
    },
    {
        mask: 'S',
        matchValue: (char: string) => char.match(/^[A-Z0-9]{1}$/gim) !== null,
    },
];

export const applyStringMask = (mask: string, value: string) => {
    const maskChars = mask.split('');
    let valueIndex = 0;

    return maskChars.reduce((output, maskChar) => {
        if (valueIndex >= value.length) {
            return output;
        }

        const token = maskTokens.find((t) => t.mask === maskChar);
        if (!token) {
            return output + maskChar;
        }

        if (token.matchValue(value[valueIndex])) {
            return output + value[valueIndex++];
        }

        return output;
    }, '');
};

export const unmaskString = (mask: string, value: string) => {
    const maskChars = mask.split('');
    let valueIndex = 0;

    return maskChars.reduce((output, maskChar) => {
        const token = maskTokens.find((t) => t.mask === maskChar);

        if (!token && value[valueIndex] === maskChar) {
            valueIndex++;
            return output;
        }

        if (valueIndex >= value.length) {
            return output;
        }

        if (token && token.matchValue(value[valueIndex])) {
            return output + value[valueIndex++];
        }

        return output;
    }, '');
};

export const maskedStringIsValid = (mask: string, maskedString: string) => {
    return maskedString.length === mask.length;
};

export default (mask: string, value: string): [string, boolean] => {
    const maskedValue = useMemo(() => applyStringMask(mask, value), [mask, value]);
    const isValid = useMemo(() => maskedStringIsValid(mask, maskedValue), [maskedValue]);
    return [maskedValue, isValid];
};
