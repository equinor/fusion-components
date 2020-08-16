import * as React from "react";
import { PersonPosition } from "@equinor/fusion";
import { PersonPositionCard } from "@equinor/fusion-components";
import * as styles from "./styles.less";

type PersonPositionCardsProps = {
    positions: PersonPosition[],
};

type PositionProject = {
    projectName: string,
    id: string,
    positions: PersonPosition[],
};

const PersonPositionCards: React.FC<PersonPositionCardsProps> = ({ positions }) => {
    if (positions.length === 0) {
        return <div className={styles.noPositions}> No positions </div>;
    }

    const personPositionProject = React.useMemo(
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
                            <a
                                href={`/apps/pro-org/${position.project.id}/${
                                    position.parentPositionId ? position.parentPositionId : " "
                                }`}
                                className={styles.orgChartLink}
                            >
                                <PersonPositionCard position={position} />
                            </a>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default PersonPositionCards;
