import React, { forwardRef, EventHandler, SyntheticEvent } from 'react';
import Content from './Content';
import getButtonClasses from '../buttonClasses';

type AnchorProps = {
    url: string;
    targetBlank?: boolean;
    onClick?: EventHandler<SyntheticEvent>;
    onClickCapture?: EventHandler<SyntheticEvent>;
    onMouseDown?: EventHandler<SyntheticEvent>;
    onMouseUp: EventHandler<SyntheticEvent>;
    displayType: string;
    mouseHasBeenDown: boolean;
};

const AnchorComponent = forwardRef<HTMLAnchorElement | null, AnchorProps>(
    (
        { children, url, targetBlank, onMouseDown, onMouseUp, onClick, onClickCapture, ...props },
        ref
    ) => (
        <a
            className={getButtonClasses(props)}
            href={url}
            target={targetBlank ? '_blank' : '_self'}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onClick={onClick}
            onClickCapture={onClickCapture}
            ref={ref}
        >
            <Content>{children}</Content>
        </a>
    )
);

AnchorComponent.defaultProps = {
    targetBlank: false,
    onClick: () => {},
    onClickCapture: () => {},
    onMouseDown: () => {},
    onMouseUp: () => {},
};

AnchorComponent.displayName = '@fusion/components/general/Button/AnchorComponent';

export default AnchorComponent;
