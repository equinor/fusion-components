
import { useState } from "react";
import useEventListener from "./useEventListener";

const KEY_HANDLERS = {
    38: "onUp",
    40: "onDown",
    37: "onLeft",
    39: "onRight",
    13: "onEnter",
    27: "onEscape",
};

export type KeyBoardEvents = {
    onUp?: Function,
    onDown?: Function,
    onLeft?: Function,
    onRight?: Function,
    onEnter?: Function,
    onEscape?: Function,
}

export default (keyBoardEvents: KeyBoardEvents) => {
    const [ref, setRef] = useState<HTMLElement | null>(null);

    const handleKeyDown = e => {
        const keyCode = e.keyCode;
        const handler = keyBoardEvents[KEY_HANDLERS[keyCode]];
        if(handler) {
            e.preventDefault();
            handler(e);
        }
    }

    useEventListener(ref, "keydown", handleKeyDown, [
        keyBoardEvents,
        ref,
    ]);

    return {setRef, current:ref}
   
}