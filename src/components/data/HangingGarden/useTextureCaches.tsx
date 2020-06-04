import * as React from 'react';
import * as PIXI from 'pixi.js';

export const TEXTURE_CACHE_KEYS: { [i: string]: keyof TextureCaches } = {
    HEADERS: 'headers',
    ITEMS: 'items',
    CHARS: 'chars',
    GRAPHICS: 'graphics',
    DESCRIPTIONS: 'descriptions',
    MASKS: 'masks',
    TOOLTIPS: 'tooltips',
    TEXTS: 'texts',
    RECTS: 'rects',
};

export type RenderTextureCache = { [key: string]: PIXI.RenderTexture };
export type TextureCache = { [key: string]: PIXI.Texture };
export type ContainerCache = { [key: string]: PIXI.Container };
export type GraphicsCache = { [key: string]: PIXI.RenderTexture };
export type TooltipsCache = PIXI.Container;

export type TextureCaches = {
    headers?: ContainerCache;
    items?: ContainerCache;
    chars?: TextureCache;
    graphics?: RenderTextureCache;
    descriptions?: any;
    masks?: GraphicsCache;
    tooltips?: TooltipsCache;
    texts?: RenderTextureCache;
    rects?: RenderTextureCache;
};

const useTextureCaches = () => {
    const [textureCaches, setTextureCaches] = React.useState<TextureCaches>({});

    const clearTextureCaches = () => {
        setTextureCaches({
            items: textureCaches?.items,
            texts: textureCaches?.texts,
            graphics: textureCaches?.graphics,
        });
    };

    const clearItemTextureCaches = () => {
        setTextureCaches({
            ...textureCaches,
            items: {},
            graphics: {},
            texts: {},
        });
    };

    const addTextureToCache = (
        cacheKey: keyof TextureCaches,
        key: string,
        texture: PIXI.RenderTexture | PIXI.Texture | PIXI.Container | PIXI.Graphics
    ) => {
        textureCaches[cacheKey]
            ? (textureCaches[cacheKey][key] = texture)
            : (textureCaches[cacheKey] = { [key]: texture });

        setTextureCaches(textureCaches);
    };

    const getTextureKeyFromCache = (
        cacheKey: keyof TextureCaches,
        key: string
    ): PIXI.RenderTexture | PIXI.Texture | PIXI.Container | PIXI.Graphics => {
        return textureCaches[cacheKey] ? textureCaches[cacheKey][key] : null;
    };

    const getTextureFromCache = (
        cacheKey: keyof TextureCaches
    ): RenderTextureCache | TextureCache | ContainerCache | GraphicsCache | TooltipsCache => {
        return textureCaches[cacheKey];
    };

    return {
        clearTextureCaches,
        clearItemTextureCaches,
        addTextureToCache,
        getTextureFromCache,
        getTextureKeyFromCache,
    };
};

export default useTextureCaches;
