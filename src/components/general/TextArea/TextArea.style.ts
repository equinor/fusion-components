import { makeStyles, createStyles } from '@equinor/fusion-react-styles';

export const useStyles = makeStyles(
    createStyles({
        textAreaContainer: {
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
        },
        textAreaContent: {
            display: 'flex',
            justifyContent: 'space-between',
            minHeight: 'calc(var(--grid-unit) * 7px)',
            backgroundColor: 'var(--color-black-alt5)',
            borderBottom: '1px solid var(--color-primary-accent)',
            caretColor: 'var(--color-primary)',
            padding: 'calc(var(--grid-unit) * 1px) calc(var(--grid-unit) * 2px)',
            borderRadius: '4px 4px 0 0',
            height: '100%',

            '& > aside': {
                paddingRight: 'calc(var(--grid-unit) * 1px)',
                display: 'flex',
                alignItems: 'center',
            },

            '&:hover': {
                cursor: 'text',
            },
        },
        disabled: {
            borderBottomColor: 'var(--color-black-alt5)',
            cursor: 'not-allowed',

            '&:hover': {
                cursor: 'not-allowed',
            },
        },

        focus: {
            borderBottom: '1px solid var(--color-primary)',
            boxShadow: '0 1px 0 var(--color-primary)',
        },
        error: {
            borderBottomColor: 'var(--color-red);',
            caretColor: 'var(--color-red)',

            '&$focus': {
                boxShadow: '0 1px 0 var(--color-red)',
            },
        },
        labelLess: {
            paddingTop: 0,
            paddingBottom: 0,
        },
        inputTextContent: {
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            width: '100%',
            height: '100%',

            '& label': {
                display: 'flex',
                position: 'relative',
                color: 'var(--color-primary-accent)',
                opacity: '0.6',
                fontSize: '16px',
                transition: 'top ease 0.2s, font-size 0.2s',
                top: 'calc(var(--grid-unit) * 2px)',
                msTransform: 'translateY(-50%)',
                transform: 'translateY(-50%)',
            },

            '& textarea': {
                fontSize: '16px',
                lineHeight: 'calc(var(--grid-unit) * 2px)',
                width: '100%',
                height: '100%',
                outline: 'none',
                backgroundColor: 'var(--color-black-alt5)',
                border: 'none',
                resize: 'none',
                paddingTop: 'calc(var(--grid-unit) * 1px)',

                '&::placeholder': {
                    color: 'var(--color-primary-accent)',
                    opacity: '0.6',
                },
            },

            '&$disabled': {
                '& label': {
                    color: 'var(--color-primary-accent)',
                    opacity: '0.6',
                    cursor: 'not-allowed',
                },

                '& input': {
                    cursor: 'not-allowed',
                },
            },
        },
        moveLabel: {
            '& label': {
                fontSize: '12px',
                lineHeight: '14px',
                top: 'calc(var(--grid-unit) * 1px)',
                opacity: 1,
                position: 'relative',
            },

            '&$error': {
                '& label': {
                    color: 'var(--color-red)',
                },
            },
        },

        helperIconText: {
            display: 'flex',
            paddingLeft: 'calc(var(--grid-unit) * 1px)',
            paddingTop: 'calc(var(--grid-unit) * 0.5px)',
        },
        helperText: {
            display: 'flex',
            position: 'relative',
            fontSize: '11px',
            paddingLeft: 'calc(var(--grid-unit) * 1px)',
            lineHeight: 'calc(var(--grid-unit) * 2px)',
            color: 'var(--color-black-alt2)',

            '&$error': {
                color: 'var(--color-red)',
            },
        },
        icon: {
            display: 'flex',
            paddingLeft: 'calc(var(--grid-unit) * 1px)',
            height: '100%',

            '& svg': {
                width: 'calc(var(--grid-unit) * 2px)',
                height: 'calc(var(--grid-unit) * 2px)',
            },
        },
    })
);

export default useStyles;
