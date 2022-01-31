import { createStyles, makeStyles } from '@equinor/fusion-react-styles';

export const useStyles = makeStyles(
    createStyles({
        container: {
            background: 'white',
            borderRadius: '4px',
            minWidth: 'fit-content',
            margin: '0 0 calc(var(--grid-unit) * 4px) 0',

            '&:last-child': {
                marginBottom: 0,
            },

            '& section': {
                margin: 0,
                padding: 'calc(var(--grid-unit) * 1px) 0',
                whiteSpace: 'nowrap',

                '& h5': {
                    margin: 'calc(var(--grid-unit) * 1px) calc(var(--grid-unit) * 2px)',
                },

                '& button': {
                    boxSizing: 'border-box',
                    width: '100%',
                    background: 'none',
                    outline: 'none',
                    border: 'none',
                    height: 'calc(var(--grid-unit) * 6px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 0,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',

                    '& > span': {
                        height: 'calc(var(--grid-unit) * 6px)',
                        padding: '0 calc(var(--grid-unit) * 3px)',
                        display: 'flex',
                        alignItems: 'center',
                        fontSize: '12px',
                        boxSizing: 'border-box',
                        width: 'calc(100% - (var(--grid-unit) / 2) * 1px)',
                        border: '1px dashed transparent',
                        textAlign: 'left',

                        '& aside': {
                            marginRight: 'calc(var(--grid-unit) * 2px)',
                        },

                        '& span': {
                            flexGrow: 2,
                        },
                    },
                    '&:not([disabled])': {
                        '&$isSelected': {
                            backgroundColor: 'var(--color-black-alt5)',
                        },

                        '&:hover': {
                            backgroundColor: 'var(--color-black-alt4)',
                        },

                        '&:focus > span': {
                            border: '1px dashed var(--color-black-alt3)',
                            borderRadius: '4px',
                        },

                        '&$isFocused > span': {
                            border: '1px dashed var(--color-black-alt3)',
                            borderRadius: '4px',
                        },

                        '&:active': {
                            background: 'none',

                            '& > span': {
                                backgroundColor: 'var(--color-primary-alt4)',
                                border: '1px dashed transparent',
                                borderRadius: '4px',
                            },
                        },
                    },
                    '&[disabled]': {
                        color: 'var(--color-black-alt2)',
                        cursor: 'not-allowed',
                    },
                },
                '& + section': {
                    borderTop: '1px solid var(--color-black-alt4)',
                },
            },
        },
        isSelected: {},
        isFocused: {},
    }),
    { name: 'fusion-components-menu' }
);

export default useStyles;
