import * as React from 'react';

import useHorizontalBreakpoint, {
    HorizontalBreakpoint,
} from '../../../hooks/useHorizontalBreakpoint';

type DataTableProps = {
    test: string,
};

const sizeBreakpoints: HorizontalBreakpoint[] = [
    { key: 'large', width: 1080 },
    { key: 'medium', width: 767 },
    { key: 'small', width: 0 },
];

const DataTable: React.FC<DataTableProps> = (props: DataTableProps): React.ReactElement => {
    const [ref, breakpoint] = useHorizontalBreakpoint(sizeBreakpoints);
    console.log('breakpoint', breakpoint);

    
    return <div ref={ref}>{props.test}</div>;
};

export default DataTable;
