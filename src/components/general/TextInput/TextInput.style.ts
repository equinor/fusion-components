import { makeStyles, createStyles } from '@equinor/fusion-react-styles';

export const useStyles = makeStyles(
    createStyles({
        inputContainer: {
            display: 'flex',
            flexDirection: 'column',
        },
        inputContent: {
            backgroundColor: 'var(--color-black-alt5)',
            borderBottom: '1px solid var(--color-primary-accent)',
            borderRadius: '4px 4px 0 0',
            caretColor: 'var(--color-primary)',
            display: 'flex',
            justifyContent: 'space-between',
            maxHeight: 'calc(var(--grid-unit) * 7px)',
            minHeight: 'calc(var(--grid-unit) * 5px)',
            padding: 'calc(var(--grid-unit) * 1px) calc(var(--grid-unit) * 2px)',

            '& > aside': {
                alignItems: 'center',
                display: 'flex',
                paddingRight: 'calc(var(--grid-unit) * 2px)',
            },

            '&:hover': {
                cursor: 'text',
            },

            '&$disabled': {
                '&$icon': {
                    opacity: 0.6,
                },
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
            borderBottomColor: 'var(--color-red)',
            caretColor: 'var(--color-red)',

            '&$focus': {
                boxShadow: '0 1px 0 var(--color-red)',
            },
        },
        labelLess: {
            paddingBottom: 0,
            paddingTop: 0,
        },
        inputTextContent: {
            display: 'flex',
            flexDirection: 'column',
            justifyontent: 'center',
            position: 'relative',
            width: '100%',

            '& label': {
                '-ms-transform': 'translateY(-50%)',
                color: 'var(--color-primary-accent)',
                fontSize: '16px',
                opacity: '0.6',
                position: 'absolute',
                top: '50%',
                transform: 'translateY(-50%)',
                transition: 'top ease 0.2s, font-size 0.2s',
            },

            '& input': {
                backgroundColor: 'var(--color-black-alt5)',
                border: 'none',
                fontSize: '16px',
                height: 'calc(var(--grid-unit) * 3px)',
                lineHeight: 'calc(var(--grid-unit) * 2px)',
                outline: 'none',
                width: '100%',

                '&::placeholder': {
                    color: 'var(--color-primary-accent)',
                    opacity: '0.6',
                },
            },

            '&$disabled': {
                '& label': {
                    color: 'var(--color-primary-accent)',
                    cursor: 'not-allowed',
                    opacity: '0.6',
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
                opacity: '1',
                position: 'relative',
                top: 'calc(var(--grid-unit) * 1px)',
            },

            '&$error': {
                '& label': {
                    color: 'var(--color-red)',
                },
            },
        },
        icon: {
            alignSelf: 'center',
            paddingLeft: ' calc(var(--grid-unit) * 2px)',

            '& svg': {
                height: 'calc(var(--grid-unit) * 3px)',
                width: 'calc(var(--grid-unit) * 3px)',
            },
        },
        helperText: {
            color: 'var(--color-black-alt1)',
            fontSize: '11px',
            lineHeight: '.grid-unit(2px) []',
            padding: '0 .grid-unit(2px) []',

            '&$error': {
                color: 'var(--color-red)',
            },
        },
    })
);

export default useStyles;
