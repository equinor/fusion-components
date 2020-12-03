import Content from './Content';
import getButtonClasses from '../buttonClasses';
import { ComponentDisplayType } from '@equinor/fusion';
import { forwardRef } from 'react';

type ButtonProps = {
    disabled?: boolean;
    onClick?: React.EventHandler<React.SyntheticEvent>;
    onClickCapture?: React.EventHandler<React.SyntheticEvent>;
    onMouseDown?: React.EventHandler<React.SyntheticEvent>;
    onMouseUp?: React.EventHandler<React.SyntheticEvent>;
    displayType: ComponentDisplayType;
    mouseHasBeenDown: boolean;
};

const ButtonComponent = forwardRef<HTMLButtonElement, React.PropsWithChildren<ButtonProps>>(
    ({ children, disabled, onMouseDown, onMouseUp, onClick, onClickCapture, ...props }, ref) => (
        <button
            type="button"
            className={getButtonClasses(props)}
            disabled={disabled}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onClick={onClick}
            onClickCapture={onClickCapture}
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

ButtonComponent.displayName = '@fusion/components/general/Button/ButtonComponent';

export default ButtonComponent;
