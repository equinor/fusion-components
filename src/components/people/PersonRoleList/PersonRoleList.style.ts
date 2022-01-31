import { makeStyles, createStyles } from '@equinor/fusion-react-styles';

export const useStyles = makeStyles(
    createStyles({
        container: {
            height: '100%',
            padding: '0 calc(var(--grid-unit) * 2px) 0 calc(var(--grid-unit) * 2px)',
        },
        roleManagementContainer: {
            borderBottom: '1px solid var(--color-black-alt4)',
            padding: 'calc(var(--grid-unit) * 1px) 0',
        },
        row: {
            display: 'flex',
            height: 'calc(var(--grid-unit) * 3px)',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        small: {
            fontSize: 'small',
        },
        error: {
            color: 'var(--color-red)',
        },
    }),
    { name: 'fusion-components-PersonRoleList' }
);

export default useStyles;
