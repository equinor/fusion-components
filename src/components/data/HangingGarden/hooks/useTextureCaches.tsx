import * as React from 'react';
import * as PIXI from 'pixi.js';

export const TEXTURE_CACHE_KEYS: { [i: string]: keyof TextureCaches } = {
    HEADERS: 'headers',
    ITEMS: 'items',
    CHARS: 'chars',
    GRAPHICS: 'graphics',
    DESCRIPTIONS: 'descriptions',
    MASKS: 'masks',
    TEXTS: 'texts',
    RECTS: 'rects',
};

export type RenderTextureCache = { [key: string]: PIXI.RenderTexture };
export type TextureCache = { [key: string]: PIXI.Texture };
export type ContainerCache = { [key: string]: PIXI.Container };
export type GraphicsCache = { [key: string]: PIXI.RenderTexture };
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

const useTextureCaches = () => {
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
