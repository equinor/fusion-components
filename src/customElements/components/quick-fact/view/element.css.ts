import { css } from '../../base';
export const style = css`
    
    header{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    header h2 {
        margin: 0;
    }

    header #toolbar {
        margin-left: 20px;
        margin-bottom: auto;
    }
    
    footer {
        display: flex;
        align-items: center;
        font-size: 0.9rem;
        color: #0084c4
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