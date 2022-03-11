import { createStyles, makeStyles } from '@equinor/fusion-react-styles';
import { FC, PropsWithChildren } from 'react';
import Icon from '@equinor/fusion-react-icon';
import { BreadCrumb } from '../../../orgChartTypes';

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
                padding: '.3rem 0',
            },
            itemContainer: {
                width: '100%',
            },
        }),
    { name: 'dropdown-item-wrapper' }
);

type DropdownItemWrapperProps = {
    breadCrumb: BreadCrumb;
};
const DropdownItemWrapper: FC<DropdownItemWrapperProps> = ({ children, breadCrumb }) => {
    const styles = useDropdownItemStyles();
    return (
        <div className={styles.container}>
            {!breadCrumb.linked && <Icon icon={'arrow_down'} className={styles.icon} />}
            <div className={styles.itemContainer}>{children}</div>
        </div>
    );
};

export default DropdownItemWrapper;
