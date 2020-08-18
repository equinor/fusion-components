import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { IBasicFilter } from '../models/ReportLevelFilters';
import PowerBIReport from '../index';
import Button from '../../../general/Button';

const ReportStandard: React.FC = () => {
    return (
        <div style={{ width: '100%', height: '100vh' }}>
            <PowerBIReport reportId={'2e90a309-625e-4396-9a5d-45e99f5b3493'} />
        </div>
    );
};

const ReportWithFilter: React.FC = () => {
    const [filterStrings, setFilterStrings] = React.useState<string[]>(null);

    const createFilter = (filters: string[]): IBasicFilter => {
        return {
            $schema: 'http://powerbi.com/product/schema#basic',
            target: {
                table: 'Dim_MasterProject',
                column: 'Project',
            },
            filterType: 1,
            operator: 'In',
            values: filters,
        };
    };

    const filter = React.useMemo(() => {
        return filterStrings ? createFilter(filterStrings) : null;
    }, [filterStrings]);

    return (
        <>
            <div>
                <Button
                    onClick={() => {
                        setFilterStrings(null);
                    }}
                >
                    No Filter
                </Button>
                <Button
                    onClick={() => {
                        setFilterStrings([
                            'Filter on something that doesnt exist will empty report',
                        ]);
                    }}
                >
                    Empty Report
                </Button>
                <Button
                    onClick={() => {
                        setFilterStrings(['Snorre Expansion Project']);
                    }}
                >
                    Snorre Expansion Project
                </Button>
                <Button
                    onClick={() => {
                        setFilterStrings(['Johan Sverdrup Phase 1']);
                    }}
                >
                    Johan Sverdrup Phase 1
                </Button>
            </div>
            <div style={{ width: '100%', height: '100%' }}>
                <PowerBIReport
                    reportId={'2e90a309-625e-4396-9a5d-45e99f5b3493'}
                    filters={filter ? [filter] : null}
                />
            </div>
        </>
    );
};

storiesOf('Data|PowerBI Report', module)
    .add('Report Standard', () => <ReportStandard />)
    .add('Report with filter', () => <ReportWithFilter />);
