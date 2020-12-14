import * as React from 'react';
import * as PIXI from 'pixi.js-legacy';
import { useHangingGardenContext } from './useHangingGardenContext';
import { DEFAULT_ITEM_TEXT_STYLE } from '../utils';

/**
 * Handles Text in items and header.
 * This is all text that are written on each item in the garden and the header.
 *
 * This hook is used by the Garden and is not intended to be used or implemented
 * outside the Garden component.
 */
const useTextNode = () => {
    const {
        pixiApp,
        stage,
        textureCaches: { getTextureFromCache, addTextureToCache },
    } = useHangingGardenContext();

    const getCharTexture = React.useCallback(
        (char: string) => {
            let texture = getTextureFromCache('chars', char) as PIXI.Texture;
            if (!texture) {
                const text = new PIXI.Text(char, DEFAULT_ITEM_TEXT_STYLE);
                stage.current.addChild(text);
                text.x = -text.width;
                text.y = -text.height;
                texture = text.texture;
                addTextureToCache('chars', char, texture);
            }

            return texture;
        },
        [getTextureFromCache, addTextureToCache, stage.current]
    );

    const createTextNode = React.useCallback(
        (text: string, color: number) => {
            let cachedText = getTextureFromCache('texts', text + color) as PIXI.RenderTexture;

            if (!cachedText) {
                const chars = text.split('');
                const textContainer = new PIXI.Container();
                textContainer.cacheAsBitmap = true;
                let x = 0;
                chars.forEach((char) => {
                    const textSprite = new PIXI.Sprite(getCharTexture(char));
                    textSprite.x = x;
                    textSprite.y = 0;
                    if (color) {
                        textSprite.tint = color;
                    }
                    textContainer.addChild(textSprite);
                    x = x + textSprite.width;
                });

                cachedText = PIXI.RenderTexture.create({
                    width: textContainer.width,
                    height: textContainer.height,
                });

                const cachedParent = textContainer.enableTempParent();
                pixiApp.current?.renderer.render(textContainer, cachedText);
                textContainer.disableTempParent(cachedParent);

                addTextureToCache('texts', text + color, cachedText);
            }

            return new PIXI.Sprite(cachedText);
        },
        [addTextureToCache, getTextureFromCache, pixiApp.current]
    );

    return { createTextNode };
};

export default useTextNode;
