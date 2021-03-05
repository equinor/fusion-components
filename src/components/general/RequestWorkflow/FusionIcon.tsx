import FusionLogo from "./FusionLogo";
import styles from "./styles.less";
import { FC } from "react";

const FusionIcon:FC= () => {
    return (
        <div className={styles.fusionIconContainer}>
            <FusionLogo scale={0.7}/>
        </div>
    )
}
export default FusionIcon;