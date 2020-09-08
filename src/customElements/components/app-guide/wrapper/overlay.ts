import { svg, directives } from '../../base';
import { ApplicationGuidanceAnchorRect } from '../anchor';

export const createOverlayMask = (rect: ApplicationGuidanceAnchorRect) => svg`
    <rect
        x="${rect.left}px"
        y="${rect.top}px"
        width="${rect.width}px"
        height="${rect.height}px"
        rx="4px"
        fill="black"
    ></rect>
`;

export const createOverlay = (anchors: { id: string, rect: ApplicationGuidanceAnchorRect }[]) => svg`
    <svg width="100%" height="100%">
        <defs>
            <mask id="Mask" width="100vw" height="100vh" x="0" y="0">
                <rect x="0px" y="0px" width="100vw" height="100vh" fill="white"></rect>
                ${directives.repeat(anchors, ({ id }) => id, ({ rect }) => createOverlayMask(rect))}
            </mask>
        </defs>
        <rect
            x="0"
            y="0"
            width="100vw"
            height="100vh"
            mask="url(#Mask)"
            fill="rgba(0, 0, 0, .5)"
            filter="blur(5px)"
        ></rect>
    </svg>
`;