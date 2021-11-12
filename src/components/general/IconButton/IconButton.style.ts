import { makeStyles, createStyles } from '@equinor/fusion-react-styles';

export const useStyles = makeStyles(
    createStyles({
        container: {
            background: 'none',
            border: 'none',
            outline: 'none',
            margin: 0,
            padding: 0,
            cursor: 'pointer',
            overflow: 'visible',
            [[
                '& $disabled',
                '& $isDisabled:active',
                '& $isDisabled:hover',
                '& $isDisabled:hover:not(:active)',
                '& $isDisabled:hover:not(:active):not(.isActive)',
            ].join(',')]: {
                cursor: 'not-allowed',
                '& $iconContainer': {
                    color: 'var(--color-black-alt3)',
                    background: 'none',
                    borderColor: 'transparent',
                    boxShadow: 'initial',
                },
            },

            //'&:focus$isToggler$iconContainer': {
            '&:focus': {
                '& $iconContainer': {
                    border: 'none',
                    backgroundColor: 'var(--color-primary-hover-alt1)',
                },
                '& $isActive': {
                    '& $iconContainer': {
                        backgroundColor: 'var(--color-primary)',
                    },
                },
            },

            '&:hover': {
                '& $iconContainer': {
                    backgroundColor: 'var(--color-primary-alt4)',
                    borderColor: 'var(--color-primary-alt4)',
                    color: 'var(--color-primary-hover)',
                },
                '&:not(:active)': {
                    '& $iconContainer': {
                        backgroundColor: 'var(--color-primary-hover)',
                    },
                    '&:not(.isActive)': {
                        '& $iconContainer': {
                            backgroundColor: 'var(--color-primary-hover-alt1)',
                        },
                    },
                },
            },
        },

        iconContainer: {
            borderStyle: 'solid',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            boxSizing: 'border-box',
            border: '1px solid transparent',
            borderRadius: '50%',
            color: 'var(--color-primary)',
        },
        isToggler: {
            '& $iconContainer': {
                borderRadius: '1px',
                border: '1px solid var(--color-black-alt4)',
            },
            '& $isActive': {
                '& $iconContainer': {
                    backgroundColor: 'var(--color-primary)',
                },
            },
        },
        comfortable: {
            width: 'calc((var(--grid-unit) * 6px) - 2px)',
            height: 'calc((var(--grid-unit) * 6px) - 2px)',
        },
        compact: {
            width: 'calc((var(--grid-unit) * 4px) - 2px)',
            height: 'calc((var(--grid-unit) * 4px) - 2px)',
        },
        isActive: {
            '& $iconContainer': {
                backgroundColor: 'var(--color-primary)',
                borderColor: 'var(--color-primary)',
                color: 'var(--color-white)',
            },
            '&:not($isToggler)': {
                '& $iconContainer': {
                    width: 'calc(100% - (var(--grid-unit) * 1px))',
                    height: 'calc(100% - (var(--grid-unit) * 1px))',
                    margin: 'calc(var(--grid-unit) * 0.5px)',
                    borderRadius: '4px',
                },
            },
        },
        active: {
            '& $iconContainer': {
                backgroundColor: 'var(--color-primary-alt4)',
                borderColor: 'var(--color-primary-alt4)',
                color: 'var(--color-primary) !important',
            },
            '& $isToggler': {
                '& $iconContainer': {
                    margin: 'auto',
                    width: 'calc(var(--grid-unit) * 4px)',
                    height: 'calc(var(--grid-unit) * 4px)',
                    borderRadius: '4px',
                    backgroundColor: 'var(--color-primary-alt3)',
                    borderColor: 'var(--color-primary-alt3)',
                },
            },
        },
    }),
    { name: 'fusion-component-iconButton' }
);

export default useStyles;
