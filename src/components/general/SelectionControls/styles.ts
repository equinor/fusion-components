import { makeStyles, createStyles } from '@equinor/fusion-react-styles';

export const useStyles = makeStyles(
    createStyles({
        container: {
            width: 'var(--container-width)',
            height: 'var(--container-height)',
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',

            '& input': {
                cursor: 'pointer',
                opacity: 0,
                position: 'absolute',
                boxShadow: 'none',
                margin: 0,
                width: 'var(--input-width)',
                height: 'var(--input-height)',
            },

            '& label': {
                cursor: 'pointer',
            },

            '&:hover:not($disabled)': {
                backgroundColor: 'var(--color-primary-alt4)',
                borderRadius: '50%',
            },

            '&:active:not($disabled)': {
                backgroundColor: 'var(--color-primary-alt3)',
                borderRadius: '50%',
            },

            '&$disabled': {
                cursor: 'not-allowed',

                '& label': {
                    cursor: 'not-allowed',
                },
                '& input': {
                    cursor: 'not-allowed',
                },
            },
        },
        disabled: {},

        //-----------------------------------switch-----------------------------------
        switch: {
            '& label': {
                width: 'var(--switch-bar-width)',
                height: 'var(--switch-bar-height)',
                borderRadius: '4px',
                backgroundColor: 'var(--switch-bar-color)',
                position: 'relative',
                overflow: 'visible',
                zIndex: 0,
                transition: 'background-color ease 0.2s',
            },

            '& input:checked + label': {
                backgroundColor: 'var(--switch-bar-on-color)',

                '& $activator': {
                    transform: 'translateY(-50%) translateX(-100%)',
                    left: '100%',
                    backgroundColor: 'var(--switch-activator-on-color)',
                    marginRight: 'var(--switch-activator-margin)',
                    marginLeft: 0,
                },
            },

            '&$disabled': {
                '& label': {
                    backgroundColor: 'var(--color-black-alt4)',
                },
                '& $activator': {
                    backgroundColor: 'var(--color-black-alt4)',
                },
                '& input:checked + label': {
                    backgroundColor: 'var(--color-black-alt4)',
                },
                '& input:checked + label $activator': {
                    backgroundColor: 'var(--color-black-alt4)',
                },
            },
        },
        activator: {
            position: 'absolute',
            zIndex: 1,
            top: '50%',
            left: 0,
            marginLeft: 'var(--switch-activator-margin)',
            transform: 'translateY(-50%)',
            backgroundColor: 'var(--switch-activator-color)',
            borderRadius: '50%',
            width: 'var(--switch-activator-size)',
            height: 'var(--switch-activator-size)',
            transition: 'transform ease 0.2s, left ease 0.2s, background-color ease 0.2s',
        },

        //-----------------------------------checkbox-----------------------------------
        checkbox: {
            '& label': {
                width: 'var(--checkbox-size)',
                height: 'var(--checkbox-size)',
                border: '1px solid var(--color-primary)',
                borderRadius: '2px',
                boxSizing: 'border-box',
            },
            '& svg': {
                width: 'calc(var(--checkbox-size) - 2px)',
                height: 'calc(var(--checkbox-size) - 2px)',
            },

            '&:hover': {
                '& $checkmark': {
                    backgroundColor: 'var(--color-primary-alt4)',
                },
            },

            '& input:checked + label': {
                borderColor: 'var(--color-primary)',
                backgroundColor: 'var(--color-primary)',

                '& $checkmark': {
                    background: 'none',
                },
            },

            '& input:indeterminate + label': {
                borderColor: 'var(--color-primary)',
                backgroundColor: 'var(--color-primary)',

                '& $checkmark': {
                    background: 'none',
                },
            },

            '&$disabled': {
                '& label': {
                    borderColor: 'var(--color-black-alt4)',
                },

                '& input:checked + label': {
                    borderColor: 'var(--color-black-alt4)',
                    backgroundColor: 'var(--color-black-alt4)',
                },
            },
        },
        checkmark: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            width: 'calc(var(--checkbox-size) - 2px)',
            height: 'calc(var(--checkbox-size) - 2px)',
            color: 'var(--color-white)',
            backgroundColor: 'white',
            transition: 'all 0.1s',
            borderRadius: '2px',
        },

        //-----------------------------------Radio-----------------------------------
        radio: {
            '& label': {
                border: '1px solid var(--color-primary)',
                width: 'var(--radio-size)',
                height: 'var(--radio-size)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            },

            '& input:checked + label': {
                '& $dot': {
                    opacity: 1,
                    transform: 'scale(1)',
                },
            },

            '&$disabled': {
                '& label': {
                    borderColor: 'var(--color-black-alt4)',
                },

                '& input:checked + label': {
                    borderColor: 'var(--color-black-alt4)',

                    '& $dot': {
                        backgroundColor: 'var(--color-black-alt4)',
                    },
                },
            },
        },
        dot: {
            display: 'block',
            backgroundColor: 'var(--color-primary)',
            borderRadius: '50%',
            transform: 'scale(0.8)',
            opacity: 0,
            transition: 'all 0.1s',
            height: 'var(--radio-dot-size)',
            width: 'var(--radio-dot-size)',
        },

        comfortable: {
            '--container-width': 'calc(var(--grid-unit) * 6px)',
            '--container-height': 'calc(var(--grid-unit) * 6px)',

            '&$switch': {
                '--switch-bar-width': 'calc((var(--grid-unit) * 5px) - 6px)',
                '--switch-bar-height': 'calc(var(--grid-unit) * 1px)',
                '--switch-activator-size': 'calc(var(--grid-unit) * 2px)',
                '--switch-activator-margin': '0px',
                '--switch-bar-color': 'var(--color-black-alt3)',
                '--switch-activator-color': 'var(--color-black-alt2)',
                '--switch-activator-on-color': 'var(--color-primary)',
                '--switch-bar-on-color': 'var(--color-supplementary-alt1)',
            },

            '&$checkbox': {
                '--checkbox-size': 'calc(var(--grid-unit) * 2px)',
            },

            '&$radio': {
                '--radio-size': 'calc(var(--grid-unit) * 2px)',
                '--radio-dot-size': 'calc(var(--grid-unit) * 1px)',
            },
        },
        compact: {
            '&$compact': {
                '--container-width': 'calc(var(--grid-unit) * 4px)',
                '--container-height': 'calc(var(--grid-unit) * 4px)',

                '&$switch': {
                    '--switch-bar-width': 'calc(var(--grid-unit) * 2px)',
                    '--switch-bar-height': 'calc(var(--grid-unit) * 1px)',
                    '--switch-activator-size': 'calc((var(--grid-unit) * 1px) - 2px)',
                    '--switch-activator-margin': '1px',
                    '--switch-bar-color': 'var(--color-black-alt1)',
                    '--switch-activator-color': 'var(--color-white)',
                    '--switch-activator-on-color': 'var(--color-white)',
                    '--switch-bar-on-color': 'var(--color-primary)',
                },

                '&$checkbox': {
                    '--checkbox-size': 'calc(var(--grid-unit) * 1.5px)',
                },

                '&$radio': {
                    '--radio-size': 'calc(var(--grid-unit) * 1.5px)',
                    '--radio-dot-size': 'calc(var(--grid-unit) * 1px)',
                },
            },
        },
    }),
    { name: 'fusion-components-selectionsControl' }
);

export default useStyles;
