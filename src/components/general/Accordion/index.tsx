import React, { FC } from 'react';
import styles from './styles.less';
import AccordionItem from './AccordionItem';
export { AccordionItem };

type AccordionProps = {
    children?: any;
};

const Accordion: FC<AccordionProps> = ({ children }) => {
    return <div className={styles.container}>{children}</div>;
};

export default Accordion;
