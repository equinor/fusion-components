import * as React from 'react';
import * as styles from './styles.less';

type StepContentProps = {
    children: any;
    activeStepKey: string;
};

const StepContent: React.FC<StepContentProps> = ({ children, activeStepKey }) => {
    const active = React.Children.toArray(children).find(
        child => child.props.stepKey === activeStepKey
    );

    if (!active) {
        return null;
    }

    const clonedChildren = React.Children.map(active.props.children, child =>
        React.cloneElement(child)
    );

    return <div>{clonedChildren}</div>;
};

export default StepContent;
