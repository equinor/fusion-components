import React, { FunctionComponent, useState } from 'react';

import { useSelector } from '@equinor/fusion/lib/epic';

import { Accordion, AccordionItem, MarkdownViewer } from '@equinor/fusion-components';

import { Store } from './store/store';

import * as styles from './styles.less';

export const PowerBIInfoRequirements: FunctionComponent<{ store: Store }> = ({ store }) => {
    const requirements = useSelector(store, 'requirements');
    const [open, setOpen] = useState<boolean>();
    return requirements ? (
        <div className={styles.accessControlContainer}>
            <Accordion>
                <AccordionItem
                    label={'Access control description'}
                    isOpen={open}
                    onChange={() => setOpen(!open)}
                >
                    <MarkdownViewer markdown={requirements} />
                </AccordionItem>
            </Accordion>
        </div>
    ) : null;
};

export default PowerBIInfoRequirements;
