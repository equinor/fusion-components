export interface AnchorRect {
    readonly bottom: number;
    readonly height: number;
    readonly left: number;
    readonly right: number;
    readonly top: number;
    readonly width: number;
    readonly x: number;
    readonly y: number;
}

export class AnchorDOMRect implements ClientRect {

    constructor(
        public x: number,
        public y: number,
        public width: number,
        public height: number
    ) { }

    get left() {
        return this.x;
    }

    get right() {
        return this.x + this.width;
    }

    get top() {
        return this.y;
    }

    get bottom() {
        return this.y + this.height;
    }

    static create(value: AnchorRect, padding?: number) {
        const rect = new AnchorDOMRect(value.x, value.y, value.width, value.height);
        return padding ? rect.applyPadding(padding) : rect;
    }

    static fromUnbound(anchor: HTMLElement, padding?: number) {
        const rects = [...anchor.children].map((child) => child.getBoundingClientRect());
        const x = Math.min(...rects.map((r) => r.left));
        const y = Math.min(...rects.map((r) => r.top));
        const width = Math.max(...rects.map((r) => r.right)) - x;
        const height = Math.max(...rects.map((r) => r.bottom)) - y;
        return AnchorDOMRect.create(new AnchorDOMRect(x, y, width, height), padding);
    }

    applyPadding(padding: number) {
        return new AnchorDOMRect(
            this.left - padding,
            this.top - padding,
            this.width + (padding * 2),
            this.height + (padding * 2)
        );
    }
}

export default AnchorDOMRect;
