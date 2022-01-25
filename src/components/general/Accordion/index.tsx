import { FC } from 'react';
import { useStyles } from './Accordion.style';
import AccordionItem from './AccordionItem';
export { AccordionItem };

type AccordionProps = {
    children?: any;
};

const Accordion: FC<AccordionProps> = ({ children }) => {
    const styles = useStyles();
    return <div className={styles.container}>{children}</div>;
};

export default Accordion;
