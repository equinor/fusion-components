import styles from "./styles.less";

export type Elevation = 0 | 1 | 2 | 3 | 4 | 6 | 8 | 12 | 16 | 24;

export default (elevation: Elevation = 0) => {
    return styles["elevation" + elevation];
};
