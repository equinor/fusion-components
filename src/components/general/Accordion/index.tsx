import { FC } from 'react';
import styles from './styles.less';
import { useStyles } from './Accordion.style';
import AccordionItem from './AccordionItem';
export { AccordionItem };

type AccordionProps = {
    children?: any;
};

const Accordion: FC<AccordionProps> = ({ children }) => {
    const styles0 = useStyles();
    return <div className={styles0.container}>{children}</div>;
};

export default Accordion;
