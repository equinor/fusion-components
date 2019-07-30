import tinycolor from "tinycolor2";
import { useMemo } from "react";
import { styling } from '@equinor/fusion-components';

const convertToHueRotation = (color?: string) => {
    if(!color) {
        return '';
    }

    const base = tinycolor(styling.colors.primary);
    const target = tinycolor(color);

    const baseHsl = base.toHsl();
    const targetHsl = target.toHsl();

    const hue = targetHsl.h - baseHsl.h;

    return `hue-rotate(${hue}deg)`;
}

const convertToSlFilter = (color?: string) => {
    if(!color) {
        return '';
    }

    const target = tinycolor(color);
    const targetHsl = target.toHsl();

    return `saturate(${targetHsl.s}) brightness(${100 + (targetHsl.l * 100)}%)`;
}

export const useColorOverrideFilter = (color?: string) => {
    const hueFilter = useMemo(() => convertToHueRotation(color), [color]);
    const slFilter = useMemo(() => convertToSlFilter(color), [color]);
    
    return { hueFilter, slFilter };
};