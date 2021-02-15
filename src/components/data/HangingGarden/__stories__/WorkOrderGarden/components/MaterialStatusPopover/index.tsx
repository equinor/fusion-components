import styles from '../../garden/styles.less';
import { MAT_STATUS_COLORS, mccrColorMap } from '../../helpers';

const MaterialStatusPopover = () => {
    return (
        <div className={styles.woPopover}>
            <section>
                <div>
                    <h4>Material status</h4>
                    <ul>
                        <li>
                            <span className={styles.dot} style={{ background: '#00FF00' }} /> OK
                        </li>
                        <li>
                            <span
                                className={styles.dot}
                                style={{
                                    background: '#' + MAT_STATUS_COLORS.AVAILABLE.toString(16),
                                }}
                            />{' '}
                            Available
                        </li>
                        <li>
                            <span
                                className={styles.dot}
                                style={{
                                    background: '#' + MAT_STATUS_COLORS.NOT_AVAILABLE.toString(16),
                                }}
                            />{' '}
                            Not Available
                        </li>
                        <li>
                            <span className={styles.dot} style={{ background: '#AFAFAF' }} /> OS
                        </li>
                    </ul>
                </div>
                <div>
                    <h4>MCCR status</h4>
                    <ul>
                        <li>
                            <span className={styles.dot} style={{ background: '#00FF00' }} /> OK
                        </li>
                        <li>
                            <span
                                className={styles.dot}
                                style={{ background: '#' + mccrColorMap.PA.toString(16) }}
                            />{' '}
                            PA
                        </li>
                        <li>
                            <span
                                className={styles.dot}
                                style={{ background: '#' + mccrColorMap.PB.toString(16) }}
                            />{' '}
                            PB
                        </li>
                        <li>
                            <span
                                className={styles.dot}
                                style={{ background: '#' + mccrColorMap.OS.toString(16) }}
                            />{' '}
                            OS
                        </li>
                    </ul>
                </div>
            </section>
            <h4>Size</h4>
            <div className={styles.list}>
                <span> Small</span>
                <span>| Medium</span>
                <span>|| Large</span>
            </div>
        </div>
    );
};

export default MaterialStatusPopover;
