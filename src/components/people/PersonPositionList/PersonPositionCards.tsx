import { PersonPosition } from '@equinor/fusion';
import { PersonPositionCard } from '@equinor/fusion-components';
import { useMemo, FC, PropsWithChildren } from 'react';
import styles from './styles.less';

type PersonPositionCardsProps = {
    positions: PersonPosition[];
    disableOrgLink?: boolean;
};

type PositionProject = {
    projectName: string;
    id: string;
    positions: PersonPosition[];
};

type CardLinkProps = {
    position: PersonPosition;
    disableOrgLink: boolean;
};

const CardLink: FC<PropsWithChildren<CardLinkProps>> = ({ children, disableOrgLink, position }) => {
    if (disableOrgLink) {
        return <>{children}</>;
    }
    return (
        <a
            href={`/apps/pro-org/${position.project.id}/${
                position.parentPositionId ? position.parentPositionId : ' '
            }`}
            className={styles.orgChartLink}
        >
            {children}
        </a>
    );
};

const PersonPositionCards: FC<PersonPositionCardsProps> = ({ positions, disableOrgLink }) => {
    if (positions.length === 0) {
        return <div className={styles.noPositions}> No positions </div>;
    }

    const personPositionProject = useMemo(
        () =>
            positions.reduce(
                (
                    prevPositionProject: PositionProject[],
                    position: PersonPosition
                ): PositionProject[] => {
                    const projectIndex = prevPositionProject.findIndex(
                        (project) => project.id === position.project.id
                    );
                    if (projectIndex !== -1) {
                        prevPositionProject[projectIndex].positions.push(position);
                        return prevPositionProject;
                    }
                    prevPositionProject.push({
                        projectName: position.project.name,
                        id: position.project.id,
                        positions: [position],
                    });
                    return prevPositionProject;
                },
                []
            ),
        [positions]
    );
    return (
        <div className={styles.personPositionsContainer}>
            {personPositionProject.map((positionProject) => (
                <div key={positionProject.id}>
                    {positionProject.positions.map((position) => (
                        <div className={styles.positionCards} key={position.id}>
                            <CardLink position={position} disableOrgLink={!!disableOrgLink}>
                                <PersonPositionCard position={position} />
                            </CardLink>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default PersonPositionCards;
