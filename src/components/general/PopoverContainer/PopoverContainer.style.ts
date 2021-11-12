import { makeStyles, createStyles } from '@equinor/fusion-react-styles';

export const useStyles = makeStyles(
    createStyles({
        popoverContainer: {

    [['&.start.below',
    '&.start.above']].join(',') {
        left: 0,

        '& $arrow': {
            left: 'calc(var(--grid-unit) * 1px)',
        }

        '& $isCentered': {
            left: 'calc(50% - (var(--grid-unit) * 1px) - (var(--arrow-width) / 2))',
        }
    }

    &.center.below,
    &.center.above {
        left: 50%;
        transform: translateX(-50%);

        .arrow {
            left: 50%;
            transform: translateX(-50%);
        }

        &.above .arrow {
            transform: translateX(-50%) rotate(180deg);
        }
    }

    &.end.below,
    &.end.above {
        right: 0;

        .arrow {
            right: calc(var(--grid-unit) * 1px);
        }

        &.isCentered {
            right: calc(50% - (var(--grid-unit) * 1px) - (var(--arrow-width) / 2));
        }
    }



        },
        fillWithContent: {
            padding: 0,
        },
        arrow: {
            position: 'absolute',
        },
        below: {
            top: '100%',
            marginTop: 'calc(var(--grid-unit) * 1px)',
            '& $arrow': {
                bottom: '100%',
            },
        },
        above: {},
        left: {},
        right: {},
        isCentered: {},
    })
);

export default useStyles;
