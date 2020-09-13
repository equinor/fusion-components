import { css } from '../../base';
// import { buttonStyle, toolbarHeaderStyle, iconButtonStyle, bodyStyle } from '../../styles';

export const style = css`
    
    slot[name="toolbar"] {
        display:flex;
        justify-content: flex-end;
    }

    slot[name="toolbar"]::slotted(*){
        margin: 0;
    }

    footer {
        display: flex;
        align-items: center;
    }

    .person-photo {
        width: calc(var(--grid-unit) * 4);
        height: calc(var(--grid-unit) * 4);
        display: inline-block;
        border-radius: 50%;
        overflow: hidden;
        margin-left: calc(var(--grid-unit) * 2);
    }

    .person-photo img {
        max-width: 100%;
    }
`;

export default [style];