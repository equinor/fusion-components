import { makeStyles, createStyles } from '@equinor/fusion-react-styles';

export const useStyles = makeStyles(
    createStyles({
        container: {
            maxWidth: 'calc(var(--grid-unit) * 40px)',
            padding: 'calc(var(--grid-unit) * 2px)',
            boxSizing: 'border-box',
            display: 'block',
            backgroundColor: 'var(--color-white)',
            border: '1px solid var(--color-black-alt4)',
            borderRadius: '4px',
            position: 'relative',
            cursor: 'pointer',
            color: 'var(--color-primary-accent)',

            '&:hover': {
                boxShadow:
                    '0px 1px 10px rgba(0, 0, 0, 0.2), 0px 4px 5px rgba(0, 0, 0, 0.12), 0px 2px 4px rgba(0, 0, 0, 0.14)',
            },
        },
        projectName: {
            fontWeight: 600,
            lineHeight: 'var(--header-line-height)',
            maxWidth: '100%',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
        },
        period: {
            fontSize: 'var(--text-font-size)',
            lineHeight: 'var(--text-line-height)',
            maxWidth: '100%',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
        },
        personPosition: {
            color: 'var(--color-primary)',
            textDecoration: 'underline',
            fontSize: 'var(--text-font-size)',
            lineHeight: 'var(--text-line-height)',
            maxWidth: '100%',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
        },
        comfortable: {
            '--container-padding': 'calc(var(--grid-unit) * 1px)',
            '--container-height': 'calc(var(--grid-unit) * 13)',
            '--header-line-height': '24px',
            '--text-font-size': '16px',
            '--text-line-height': '24px',
        },
        compact: {
            '--container-padding': 'calc(var(--grid-unit) * 1px)',
            '--container-height': 'calc(var(--grid-unit) * 12)',
            '--header-line-height': '24px',
            '--text-font-size': '14px',
            '--text-line-height': '16px',
        },
    })
);
