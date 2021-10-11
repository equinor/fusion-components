import { forwardRef, EventHandler, SyntheticEvent } from 'react';
import Content from './Content';
import getButtonClasses from '../buttonClasses';
import { ComponentDisplayType } from '@equinor/fusion';
import { Link } from 'react-router-dom';

type AnchorProps = {
    url: string;
    relativeUrl?: string;
    targetBlank?: boolean;
    onClick?: EventHandler<SyntheticEvent>;
    onClickCapture?: EventHandler<SyntheticEvent>;
    onMouseDown?: EventHandler<SyntheticEvent>;
    onMouseUp: EventHandler<SyntheticEvent>;
    displayType: ComponentDisplayType;
    mouseHasBeenDown: boolean;
};

const AnchorComponent = forwardRef<HTMLAnchorElement, AnchorProps>(
    (
        {
            children,
            url,
            targetBlank,
            onMouseDown,
            onMouseUp,
            onClick,
            onClickCapture,
            relativeUrl,
            ...props
        },
        ref
    ) => {
        if (relativeUrl) {
            return (
                <span className={getButtonClasses(props)} ref={ref}>
                    <Link
                        to={relativeUrl}
                        target={targetBlank ? '_blank' : '_self'}
                        rel="noreferrer"
                        onMouseDown={onMouseDown}
                        onMouseUp={onMouseUp}
                    >
                        <Content>{children}</Content>
                    </Link>
                </span>
            );
        } else {
            return (
                <a
                    className={getButtonClasses(props)}
                    href={url}
                    target={targetBlank ? '_blank' : '_self'}
                    rel="noreferrer"
                    onMouseDown={onMouseDown}
                    onMouseUp={onMouseUp}
                    onClick={onClick}
                    onClickCapture={onClickCapture}
                    ref={ref}
                >
                    <Content>{children}</Content>
                </a>
            );
        }
    }
);

AnchorComponent.defaultProps = {
    targetBlank: false,
    onClick: () => {},
    onClickCapture: () => {},
    onMouseDown: () => {},
    onMouseUp: () => {},
};

AnchorComponent.displayName = 'Anchor';

export default AnchorComponent;
