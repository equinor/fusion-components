import * as React from 'react';

type StepContentProps = {
    children: any;
    activeStepKey: string;
};

const StepContent: React.FC<StepContentProps> = ({ children, activeStepKey }) => {
    const active = React.Children.toArray(children).find(
        child => (child as React.ReactElement).props.stepKey === activeStepKey
    ) as React.ReactElement;

    if (!active) {
        return null;
    }

    const clonedChildren = React.Children.map(active.props.children, child =>
        React.cloneElement(child)
    );

    return <>{clonedChildren}</>;
};

export default StepContent;
