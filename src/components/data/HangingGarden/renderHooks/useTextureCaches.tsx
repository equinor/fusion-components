import * as React from 'react';
import * as PIXI from 'pixi.js';

export type TEXTURE_CACHE_KEYS =
    | 'headers'
    | 'items'
    | 'chars'
    | 'graphics'
    | 'descriptions'
    | 'masks'
    | 'texts'
    | 'rects';

export type RenderTextureCache = Record<string, PIXI.RenderTexture>;
export type TextureCache = Record<string, PIXI.Texture>;
export type ContainerCache = Record<string, PIXI.Container>;
export type GraphicsCache = Record<string, PIXI.RenderTexture>;
export type TooltipsCache = PIXI.Container;

export type TextureCaches = {
    headers: ContainerCache;
    items: ContainerCache;
    chars: TextureCache;
    graphics: RenderTextureCache;
    descriptions: any;
    masks: GraphicsCache;
    texts: RenderTextureCache;
    rects: RenderTextureCache;
};

const defaultState = () => ({
    headers: {},
    items: {},
    chars: {},
    graphics: {},
    descriptions: {},
    masks: {},
    texts: {},
    rects: {},
});

export type Caches = {
    clearTextureCaches: () => void;
    clearItemTextureCaches: () => void;
    addTextureToCache: (
        cacheKey: keyof TextureCaches,
        key: string,
        texture: PIXI.RenderTexture | PIXI.Texture | PIXI.Container | PIXI.Graphics
    ) => void;
    getTextureFromCache: (
        cacheKey: keyof TextureCaches,
        key: string
    ) => PIXI.RenderTexture | PIXI.Texture | PIXI.Container | PIXI.Graphics;
};
/**
 * Cache of all textures and texts that are created by other rendering hooks.
 * The cache will keep these between renderes. This makes it possible to reuse similar items and text.
 * Making the rendering of the garden alot faster.
 *
 * This hook is used by the Garden and is not intended to be used or implemented
 * outside the Garden component.
 */
const useTextureCaches = (): Caches => {
    const textureCaches = React.useRef<TextureCaches>(defaultState());

    const clearTextureCaches = React.useCallback(() => {
        const newState = defaultState();

        textureCaches.current = {
            ...newState,
            items: textureCaches.current.items,
            graphics: textureCaches.current.graphics,
            texts: textureCaches.current.texts,
        };
    }, [textureCaches]);

    const clearItemTextureCaches = React.useCallback(() => {
        textureCaches.current = {
            ...textureCaches.current,
            items: {},
            graphics: {},
            texts: {},
        };
    }, [textureCaches]);

    const addTextureToCache = React.useCallback(
        (
            cacheKey: keyof TextureCaches,
            key: string,
            texture: PIXI.RenderTexture | PIXI.Texture | PIXI.Container | PIXI.Graphics
        ) => {
            textureCaches.current[cacheKey][key] = texture;
        },
        [textureCaches]
    );

    const getTextureFromCache = React.useCallback(
        (
            cacheKey: keyof TextureCaches,
            key: string
        ): PIXI.RenderTexture | PIXI.Texture | PIXI.Container | PIXI.Graphics => {
            return textureCaches.current[cacheKey][key];
        },
        [textureCaches]
    );

    return {
        clearTextureCaches,
        clearItemTextureCaches,
        addTextureToCache,
        getTextureFromCache,
    };
};

export default useTextureCaches;
