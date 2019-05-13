
import { useState } from "react";
import useEventListener from "./useEventListener";

const KEY_HANDLERS = {
    UP: "onUp",
    DOWN: "onDown",
    LEFT: "onLeft",
    RIGHT: "onRight",
    ENTER: "onEnter",
    ESCAPE: "onEscape",
};

const KEY_CODES = {
    UP: 38,
    DOWN: 40,
    LEFT: 37,
    RIGHT: 39,
    ENTER: 13,
    ESCAPE: 27,
};

export type KeyBoardEvents = {
    onUp?: Function,
    onDown?: Function,
    onLeft?: Function,
    onRight?: Function,
}

export default (keyBoardEvents: KeyBoardEvents) => {
    const [ref, setRef] = useState(null);

    const handleKeyDown = e => {
        const keyCode = e.keyCode;
        for(const key in KEY_HANDLERS) {
            if(KEY_CODES[key] === keyCode) {
                const handler = keyBoardEvents[KEY_HANDLERS[key]];
                if(handler) {
                    e.preventDefault();
                    handler(e);
                }
                break;
            }
        }
    }

    useEventListener(ref, "keydown", handleKeyDown, [
        keyBoardEvents,
        ref,
    ]);

    return setRef
   
}