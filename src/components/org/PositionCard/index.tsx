import { ReactNode, useCallback, useMemo, CSSProperties } from 'react';
import classNames from 'classnames';
import { Position, useComponentDisplayClassNames, PositionInstance } from '@equinor/fusion';
import { useStyles } from './PositionCard.style';
import PositionIconPhoto from './components/PositionIconPhoto';
import PositionInstanceComponent from './components/PositionInstance';
import RotationInstances from './components/RotationInstances';
import { createStyles, makeStyles } from '@equinor/fusion-react-styles';

export type ChildCountTypeKey = 'positions' | 'fte' | 'uniquePersons';

export const childCountTypeNameMapping: Record<ChildCountTypeKey, string> = {
    positions: 'Positions',
    fte: 'Full time equivalents (FTE)',
    uniquePersons: 'Unique persons',
};

type CustomCardStyles = {
    backgroundStyle?: CSSProperties;
    borderStyle?: CSSProperties;
};

type PositionCardProps = {
    position: Position;
    instance?: PositionInstance;
    isSelected?: boolean;
    showExternalId: boolean;
    showLocation: boolean;
    showDate: boolean;
    showObs: boolean;
    showTimeline: boolean;
    isFuture?: boolean;
    isPast?: boolean;
    isLinked?: boolean;
    childCount?: number;
    childCountType?: ChildCountTypeKey;
    selectedDate?: Date;
    showRotation?: boolean;
    onClick?: (position: Position, instance?: PositionInstance) => void;
    onExpand?: (position: Position, instance?: PositionInstance) => void;
    personPhotoComponent?: ReactNode;
    showTaskOwner?: boolean;
    anonymize?: boolean;
} & CustomCardStyles;

const useCardStyles = ({ backgroundStyle, borderStyle }: CustomCardStyles) =>
    makeStyles((theme) =>
        createStyles({
            container: {
                backgroundColor: 'var(--color-white)',
                border: '2px solid var(--color-black-alt4)',
                '&$futureBackground': {
                    backgroundColor:
                        theme.colors.interactive.success__highlight.getVariable('color'),
                },
                '&$futureBorder': {
                    borderColor: theme.colors.interactive.success__resting.getVariable('color'),
                },
                '&$pastBackground': {
                    backgroundColor: theme.colors.interactive.disabled__fill.getVariable('color'),
                },
                '&$pastBorder': {
                    borderColor: theme.colors.interactive.disabled__text.getVariable('color'),
                },
                '&$customBackgroundStyle': backgroundStyle,
                '&$customBorderStyle': borderStyle,
            },
            futureBackground: {},
            futureBorder: {},
            pastBackground: {},
            pastBorder: {},
            customBackgroundStyle: {},
            customBorderStyle: {},
        })
    )();

const PositionCard: React.FC<PositionCardProps> = ({
    position,
    instance,
    isSelected,
    showExternalId,
    showLocation,
    showDate,
    showObs,
    showTimeline,
    onClick,
    onExpand,
    isFuture,
    isPast,
    isLinked,
    childCount,
    childCountType,
    selectedDate,
    showRotation,
    personPhotoComponent,
    showTaskOwner,
    backgroundStyle,
    borderStyle,
    anonymize,
}) => {
    const styles = useStyles();
    const isExternalHire =
        instance &&
        instance.assignedPerson &&
        instance.assignedPerson.jobTitle &&
        instance.assignedPerson.jobTitle.toLowerCase().startsWith('ext');
    const isExternal =
        instance && instance.assignedPerson && instance.assignedPerson.accountType === 'External';
    const isConsultant =
        instance && instance.assignedPerson && instance.assignedPerson.accountType === 'Consultant';

    const cardStyles = useCardStyles({ backgroundStyle, borderStyle });

    const background = () => {
        if (!!backgroundStyle) return cardStyles.customBackgroundStyle;
        if (isFuture) return cardStyles.futureBackground;
        if (isPast) return cardStyles.pastBackground;
    };

    const border = () => {
        if (!!borderStyle) return cardStyles.customBorderStyle;
        if (isFuture) return cardStyles.futureBorder;
        if (isPast) return cardStyles.pastBorder;
    };

    const containerClassNames = classNames(
        styles.context,
        cardStyles.container,
        useComponentDisplayClassNames(styles),
        {
            [styles.isSelected]: isSelected,
            [styles.isClickable]: !!onClick,
            [styles.isLinked]: isLinked,
            [background()]: !!background(),
            [border()]: !!border(),
        }
    );

    const onClickHandler = useCallback(() => {
        if (onClick) {
            onClick(position, instance);
        }
    }, [position, instance, onClick]);

    const filterToDate = useMemo(() => selectedDate || new Date(), [selectedDate]);

    const allInstances = useMemo(
        () =>
            position.instances.filter(
                (i) =>
                    i.appliesFrom.getTime() <= filterToDate.getTime() &&
                    i.appliesTo.getTime() >= filterToDate.getTime()
            ),
        [filterToDate, position]
    );
    const rotatingInstances: PositionInstance[] = useMemo(
        () =>
            instance
                ? allInstances.filter((i) => i.id !== instance.id && i.type === 'Rotation')
                : [],
        [instance, allInstances]
    );

    return (
        <div className={containerClassNames} onClick={onClickHandler}>
            <div className={styles.container}>
                <PositionIconPhoto
                    position={position}
                    currentInstance={instance}
                    isLinked={isLinked}
                    onClick={onClick}
                    rotationInstances={rotatingInstances}
                    personPhotoComponent={personPhotoComponent}
                    showTaskOwner={showTaskOwner}
                    anonymize={anonymize}
                />
                <PositionInstanceComponent
                    position={position}
                    instance={instance}
                    showLocation={showLocation}
                    showDate={showDate}
                    showExternalId={showExternalId}
                    showObs={showObs}
                    showTimeline={showTimeline}
                    onClick={onClick}
                    onExpand={onExpand}
                    childCount={childCount}
                    childCountType={childCountType}
                    rotationInstances={rotatingInstances}
                    selectedDate={selectedDate}
                    anonymize={anonymize}
                />
            </div>
            {showRotation && allInstances.length > 1 && rotatingInstances.length > 0 && (
                <RotationInstances
                    allInstances={allInstances}
                    position={position}
                    anonymize={anonymize}
                />
            )}
        </div>
    );
};

export default PositionCard;
