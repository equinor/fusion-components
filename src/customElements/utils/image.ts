export const loadImage = (src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.src = src;
        image.addEventListener('load', () => resolve(), { once: true, passive: true });
        image.addEventListener('error', reject, { once: true, passive: true });
    });
}

export const createThumbnail = async <K extends keyof HTMLElementTagNameMap>(src: string, type: K): Promise<HTMLElementTagNameMap[K]> => {
    await loadImage(src);
    const thumbnail = document.createElement(type);
    (thumbnail as HTMLElement).style.backgroundImage = `url(${src})`;
    return thumbnail;
}
