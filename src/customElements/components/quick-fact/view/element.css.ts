import { css } from '../../base';
// import { buttonStyle, toolbarHeaderStyle, iconButtonStyle, bodyStyle } from '../../styles';

export const style = css`
    
    header{
        display: flex;
    }

    #toolbar {
        margin-left: auto;
    }

    footer {
        display: flex;
        align-items: center;
        font-size: 0.9rem;
    }
    footer .publisher-name{
        font-weight: bold;
    }

    .person-photo {
        display: inline-block;
        border-radius: 50%;
        overflow: hidden;
        width: 2rem;
        height: 2rem;
        margin-left: 1rem;
    }

    .person-photo img {
        height: 100%;
        max-width: 100%;
    }
`;

export default [style];