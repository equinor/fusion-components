import { makeStyles, createStyles } from '@equinor/fusion-react-styles';

export const useStyles = makeStyles(
    createStyles({
        stepperContainer: {
            display: 'grid',
        },
        verticalStepperContainer: {
            gridTemplateColumns: 'max-content auto',
            height: '100%',
        },
        stepper: {
            display: 'grid',
            gridTemplateColumns: 'max-content max-content auto',
            gridTemplateAreas: '"prev next stepPane"',
            borderBottom: '1px solid var(--color-black-alt3)',
            padding: 'calc(var(--grid-unit) * 2px) 0',

            '@media (max-width: 767px)': {
                gridTemplateColumns: 'max-content auto max-content',
                gridTemplateAreas: '"prev stepPane next"',
                padding: 0,
                border: 'none',
            },
        },
        verticalStepper: {
            gridTemplateColumns: 'max-content max-content 1fr',
            gridTemplateRows: 'max-content auto',
            gridTemplateAreas: '"prev next ." "stepPane stepPane stepPane"',
            borderBottom: 'none',
            borderRight: '1px solid var(--color-black-alt3)',

            '@media (max-width: 767px)': {
                gridTemplateColumns: 'max-content auto max-content',
                gridTemplateAreas: '"prev stepPane next"',
                padding: 0,
                border: 'none',
            },
        },
        prev: {
            gridArea: 'prev',
        },
        next: {
            gridArea: 'next',
        },
        navigation: {
            display: 'flex',
            flexShrink: 0,

            '@media (max-width: 767px)': {
                alignSelf: 'flex-start',
            },
        },
        stepPaneWrapper: {
            gridArea: 'stepPane',
            scrollBehavior: 'smooth',
            overflow: 'hidden',
        },
        stepPane: {
            display: 'flex',
            flexGrow: 1,
        },
        verticalSteps: {
            flexDirection: 'column',
        },
        step: {
            padding: 'calc(var(--grid-unit) * 1px)',
            paddingLeft: 'calc(var(--grid-unit) * 2px)',
            paddingRight: 'calc(var(--grid-unit) * 2px)',
            display: 'grid',
            flexGrow: 1,
            //color: 'var(--color-black)',
            gridTemplateColumns: 'calc(var(--grid-unit) * 6px) minmax(max-content, auto)',
            gridTemplateAreas: '"badge title" " . description"',
            gridTemplateRows:
                'minmax(calc(var(--grid-unit) * 3px), auto) minmax(calc(var(--grid-unit) * 3px), auto)',
            gridRowGap: 'calc(var(--grid-unit) * 1px)',

            '--line-color': 'var(--color-primary)',

            '@media (max-width: 767px)': {
                gridTemplateAreas: '"badge title" "progress description"',
                gridTemplateColumns: 'calc(var(--grid-unit) * 6px) auto',
                paddingLeft: 0,
                paddingRight: 0,
            },

            'a&': {
                color: 'var(--color-black)',
            },

            '&$compact': {
                padding: 'calc(var(--grid-unit) * 0.5px)',
            },
        },
        compact: {},
        isClickable: {
            cursor: 'pointer',
        },
        disabled: {
            cursor: 'not-allowed',
            color: 'var(--color-black-alt3) !important',
            '--line-color': 'var(--color-black-alt3)',
        },
        current: {
            fontWeight: 500,
        },
        title: {
            gridArea: 'title',
            overflow: 'hidden',
            paddingLeft: 'calc(var(--grid-unit) * 1px)',
            alignSelf: 'center',
            display: 'flex',

            '&$compact': {
                width: 'calc(var(--grid-unit) * 24px)',
            },

            '& > $text ': {
                display: 'block',
            },

            '& > $text::after': {
                display: 'block',
                content: 'attr(title)',
                fontWeight: 500,
                height: 0,
                overflow: 'hidden',
                visibility: 'hidden',
            },
        },
        text: {
            display: 'block',
        },
        isLastStep: {
            width: 'inherit',

            '& > span': {
                '&::after': {
                    border: 0,
                },
            },
        },
        badge: {
            gridArea: 'badge',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            top: 0,
            height: 'calc(var(--grid-unit) * 3px)',
            width: 'calc(var(--grid-unit) * 3px)',
            fontWeight: 500,
            border: '1px solid var(--color-black-alt3)',
            borderRadius: '50%',
            flexShrink: 0,

            '&$compact': {
                height: 'calc(var(--grid-unit) * 2px)',
                width: 'calc(var(--grid-unit) * 2px)',
            },
        },
        active: {
            border: '1px solid var(--color-primary)',
            background: 'var(--color-primary)',
            color: 'var(--color-white)',
        },
        done: {
            border: '1px solid var(--color-primary)',
            color: 'var(--color-primary)',
        },
        description: {
            gridArea: 'description',
            color: 'var(--color-black-alt2)',
            paddingLeft: 'calc(var(--grid-unit) * 1px)',
        },
        content: {
            display: 'flex',
        },
        progress: {
            color: 'var(--color-black-alt2)',
            fontWeight: 300,

            '@media (max-width: 767px)': {
                gridArea: 'progress',
                fontSize: '12px',
                width: 'calc(var(--grid-unit) * 4px)',
                whiteSpace: 'nowrap',
            },
        },
        stepperLine: {
            minWidth: 'calc(var(--grid-unit) * 3px)',
            content: ' ',
            flexGrow: 1,
            height: 'calc(var(--grid-unit) * 1px)',
            borderBottom: '1px solid var(--line-color)',
            marginLeft: 'calc(var(--grid-unit) * 2px)',

            '@media (max-width: 767px)': {
                display: 'none',
            },
        },

        verticalStepperLine: {
            minWidth: 'calc(var(--grid-unit) * 3px)',
            content: ' ',
            flexGrow: 1,
            height: 'calc(var(--grid-unit) * 3px)',
            borderLeft: '1px solid var(--line-color)',
            marginLeft: 'calc(var(--grid-unit) * 1.5px)',

            '@media (max-width: 767px)': {
                display: 'none',
            },
        },
        comfortable: {},
    }),
    { name: 'fusion-components-stepper' }
);

export default useStyles;
