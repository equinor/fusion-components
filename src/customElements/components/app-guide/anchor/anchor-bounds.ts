/**
 * Rectangle of an application guidance anchor
 */
export class ApplicationGuidanceAnchorRect {
    constructor(
        public top: number,
        public right: number,
        public bottom: number,
        public left: number,
    ) { }

    /**
     * container width in pixels
     */
    get width(): number {
        return this.right - this.left;
    }

    /**
     * container height in pixels
     */
    get height() {
        return this.bottom - this.top;
    }

    /**
     * apply padding to current rectangle
     */
    applyPadding(padding: number) {
        this.top -= padding;
        this.right += padding;
        this.bottom += padding;
        this.left -= padding;
    }
}