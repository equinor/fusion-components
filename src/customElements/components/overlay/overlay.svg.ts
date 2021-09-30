import { svg, directives } from '../base';
import { AnchorRect } from './anchor/anchor-rect';

const mask = (rect: AnchorRect) => svg`
    <rect
        x="${rect.left}px"
        y="${rect.top}px"
        width="${rect.width}px"
        height="${rect.height}px"
        rx="4px"
        fill="black"
    ></rect>
`;

export const overlay = (
    anchors: { id: string; rect: AnchorRect }[],
    options: { height: string; width: string }
) => svg`
    <svg width="${options.width || '100%'}" height="${options.height || '100%'}">
        <defs>
            <mask id="Mask" width="100%" height="100%" x="0" y="0">
                <rect x="0px" y="0px" width="100%" height="100%" fill="white"></rect>
                ${directives.repeat(
                    anchors,
                    ({ id }) => id,
                    ({ rect }) => mask(rect)
                )}
            </mask>
        </defs>
        <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            mask="url(#Mask)"
            fill="rgba(0, 0, 0, .5)"
        ></rect>
    </svg>
`;

export default overlay;
