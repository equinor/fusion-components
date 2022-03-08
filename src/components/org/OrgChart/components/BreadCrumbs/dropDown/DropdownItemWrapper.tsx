import { createStyles, makeStyles } from '@equinor/fusion-react-styles';
import { FC, PropsWithChildren } from 'react';
import Icon from '@equinor/fusion-react-icon';

const useDropdownItemStyles = makeStyles(
    (theme) =>
        createStyles({
            container: {
                display: 'grid',
                width: '100%',
                justifyItems: 'center',
                fontSize: '0.5rem',
            },
            icon: {
                color: theme.colors.text.static_icons__default.getVariable('color'),
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '.6rem',
            },
            itemContainer: {
                width: '100%',

                '&:hover': {
                    backgroundColor:
                        theme.colors.interactive.primary__hover_alt.getVariable('color'),
                    cursor: ' pointer',
                },
            },
        }),
    { name: 'dropdown-item-wrapper' }
);

type DropdownItemProps = {
    index: number;
};

const DropdownItemWrapper: FC<PropsWithChildren<DropdownItemProps>> = ({ children, index }) => {
    const styles = useDropdownItemStyles();
    return (
        <div className={styles.container}>
            {index !== 0 && <Icon icon={'arrow_down'} className={styles.icon} />}
            <div className={styles.itemContainer}>{children}</div>
        </div>
    );
};

export default DropdownItemWrapper;
