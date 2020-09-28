export class AnchorDOMRect extends DOMRect {
    static create(value: Pick<DOMRect, 'x' | 'y' | 'width' | 'height'>, padding?: number) {
        const rect = new AnchorDOMRect(value.x, value.y, value.width, value.height);
        return padding ? rect.applyPadding(padding) : rect;
    }

    static fromUnbound(anchor: HTMLElement, padding?: number) {
        const rects = [...anchor.children].map((child) => child.getBoundingClientRect());
        const x = Math.min(...rects.map((r) => r.left));
        const y = Math.min(...rects.map((r) => r.top));
        const width = Math.max(...rects.map((r) => r.right)) - x;
        const height = Math.max(...rects.map((r) => r.bottom)) - y;
        return AnchorDOMRect.create({
            x, y, width, height
        }, padding);
    }

    applyPadding(padding: number) {
        return new AnchorDOMRect(
            this.x - padding,
            this.y - padding,
            this.width + (padding * 2),
            this.height + (padding * 2)
        );
    }
}

export default AnchorDOMRect;
