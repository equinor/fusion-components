import React, { FC, useRef, useState, useEffect } from 'react';
import styles from './styles.less';

type AccordionProps = {
    children?: any;
};

const Accordion: FC<AccordionProps> = ({ children }) => {
    return <div className={styles.container}>{children}</div>;
};

export default Accordion;
