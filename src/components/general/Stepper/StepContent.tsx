import { FC, Fragment, Children, ReactElement, cloneElement } from 'react';

type StepContentProps = {
    children: any;
    activeStepKey: string;
};

const StepContent: FC<StepContentProps> = ({ children, activeStepKey }) => {
    const active = Children.toArray(children).find(
        (child) => (child as ReactElement).props.stepKey === activeStepKey
    ) as ReactElement;

    if (!active) {
        return null;
    }

    const clonedChildren = Children.map(active.props.children, (child) => cloneElement(child));

    return <Fragment>{clonedChildren}</Fragment>;
};

export default StepContent;
