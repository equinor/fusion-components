import React from "react";
import styles from "../styles.less";

const PopoverArrow = () => (
    <div className={styles.arrow}>
        <svg
            width="18"
            height="16"
            viewBox="0 0 18 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g filter="url(#filter0_dd)">
                <path d="M9 4L4 8L14 8L9 4Z" fill="white" />
            </g>
            <defs>
                <filter
                    id="filter0_dd"
                    x="0"
                    y="0"
                    width="18"
                    height="16"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    />
                    <feOffset dy="-1.7" />
                    <feGaussianBlur stdDeviation="1.7" />
                    <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.04 0"
                    />
                    <feBlend
                        mode="normal"
                        in2="effect1_dropShadow"
                        result="effect2_dropShadow"
                    />
                    <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect2_dropShadow"
                        result="shape"
                    />
                </filter>
            </defs>
        </svg>
    </div>
);

PopoverArrow.displayName = "@fusion/components/general/Popover/Arrow";

export default PopoverArrow;
