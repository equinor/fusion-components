import styles from '../../garden/styles.less';

const HoldStatusPopover = () => {
    return (
        <div className={styles.woPopover}>
            <h4>Hold status</h4>
            <ul>
                <li>
                    <span className={styles.flagSpacer} /> No hold
                </li>
                <li>
                    <span className={styles.redFlag} /> Hold by ENG, EWP, JLL, MAT, MC, OFF, PRE, WO
                </li>
                <li>
                    <span className={styles.yellowFlag} /> Hold by MATB
                </li>
            </ul>
        </div>
    );
};

export default HoldStatusPopover;
