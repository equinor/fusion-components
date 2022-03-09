import { Dropdown, useDropdownController } from '@equinor/fusion-components';
import Icon from '@equinor/fusion-react-icon';
import { clsx, createStyles, makeStyles } from '@equinor/fusion-react-styles';
import { FC, MutableRefObject, PropsWithChildren, useContext } from 'react';
import { BreadCrumb } from '../../../orgChartTypes';
import { OrgChartContext, OrgChartContextReducer } from '../../../store';
import DropdownItemWrapper from './DropdownItemWrapper';

const useDropdownStyles = makeStyles(
    (theme) =>
        createStyles({
            dropdown: {
                position: 'relative',
                background: theme.colors.text.static_icons__primary_white.getVariable('color'),

                '&:hover': {
                    '& $separator': {
                        borderColor: theme.colors.text.static_icons__secondary.getVariable('color'),
                    },
                    '& $icon': {
                        color: theme.colors.interactive.primary__hover.getVariable('color'),
                    },
                },
            },
            defaultStyle: {
                border: '1px solid',
                borderColor: theme.colors.ui.background__medium.getVariable('color'),
                borderRadius: '4px',
                '&:hover': {
                    cursor: 'pointer',
                    borderColor: theme.colors.text.static_icons__secondary.getVariable('color'),
                },
            },
            container: {
                display: 'grid',
                gridTemplateColumns: '1fr auto 2rem',
            },
            separator: {
                borderLeft: `1px solid`,
                borderColor: theme.colors.ui.background__medium.getVariable('color'),
            },
            icon: {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '0 4px 4px 0',
                '&:hover': {
                    backgroundColor:
                        theme.colors.interactive.primary__hover_alt.getVariable('color'),
                },
            },
            itemContainer: {
                width: '100%',
                borderRadius: '4px 0 0 4px',
                '&:hover': {
                    backgroundColor:
                        theme.colors.interactive.primary__hover_alt.getVariable('color'),
                    cursor: ' pointer',
                },
            },
        }),
    { name: 'org-admin-dropdown-styles' }
);

type DropdownContainerProps = {
    items: BreadCrumb[] | null;
};

const DropdownContainer: FC<PropsWithChildren<DropdownContainerProps>> = ({ items, children }) => {
    const styles = useDropdownStyles();
    const {
        state: { breadCrumbComponent },
    } = useContext<OrgChartContextReducer>(OrgChartContext);

    const dropdownController = useDropdownController((_, isOpen, setIsOpen) => (
        <div className={clsx(styles.defaultStyle, styles.container)}>
            <div className={styles.itemContainer}>{children}</div>
            <div className={styles.separator} />
            <div className={styles.icon} onClick={() => setIsOpen(!isOpen)}>
                <Icon icon="arrow_drop_down" />
            </div>
        </div>
    ));

    const containerRef =
        dropdownController.controllerRef as MutableRefObject<HTMLDivElement | null>;

    if (!items?.length) {
        return <div className={styles.defaultStyle}>{children}</div>;
    }
    const BreadCrumbComponent = breadCrumbComponent;
    return (
        <div className={styles.dropdown} ref={containerRef}>
            <Dropdown controller={dropdownController}>
                {items.map((item, index) => (
                    <DropdownItemWrapper key={index}>
                        <BreadCrumbComponent
                            label={item.label}
                            id={item.id}
                            childId={item.childId}
                            content={item.content}
                            breadCrumbItem={item.breadCrumbItem}
                        />
                    </DropdownItemWrapper>
                ))}
            </Dropdown>
        </div>
    );
};

export default DropdownContainer;
