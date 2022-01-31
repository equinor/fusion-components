import Content from './Content';
import getButtonClasses from '../buttonClasses';
import { ComponentDisplayType } from '@equinor/fusion';
import { EventHandler, forwardRef, PropsWithChildren, SyntheticEvent } from 'react';

type ButtonProps = {
    disabled?: boolean;
    onClick?: EventHandler<SyntheticEvent>;
    onClickCapture?: EventHandler<SyntheticEvent>;
    onMouseDown?: EventHandler<SyntheticEvent>;
    onMouseUp?: EventHandler<SyntheticEvent>;
    id?: string;
    displayType: ComponentDisplayType;
    mouseHasBeenDown: boolean;
};

const ButtonComponent = forwardRef<HTMLButtonElement, PropsWithChildren<ButtonProps>>(
    ({ children, disabled, onMouseDown, onMouseUp, onClick, onClickCapture, id, ...props }, ref) => (
        <button
            type="button"
            className={getButtonClasses(props)}
            disabled={disabled}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onClick={onClick}
            onClickCapture={onClickCapture}
            id={id}
            ref={ref}
        >
            <Content>{children}</Content>
        </button>
    )
);

ButtonComponent.defaultProps = {
    disabled: true,
    onClick: () => {},
    onClickCapture: () => {},
    onMouseDown: () => {},
    onMouseUp: () => {},
};

ButtonComponent.displayName = 'Button';

export default ButtonComponent;
