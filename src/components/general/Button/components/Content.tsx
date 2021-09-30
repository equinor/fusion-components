import styles from '../styles/index.less';
import { FC } from 'react';

const Content: FC = ({ children }) => <span className={styles.button}>{children}</span>;

Content.displayName = 'ButtonContent';

export default Content;
