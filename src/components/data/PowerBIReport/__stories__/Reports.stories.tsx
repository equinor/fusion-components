import { storiesOf } from '@storybook/react';
import {useMemo, useState} from "react";
import { IBasicFilter } from '../models/ReportLevelFilters';
import PowerBIReport from '../index';
import Button from '../../../general/Button';
import withFusionStory from '../../../../../.storybook/withFusionStory';

const ReportStandard: React.FC = () => {
    return (
        <div style={{ width: '100%', height: '100vh' }}>
            <PowerBIReport reportId={'2e90a309-625e-4396-9a5d-45e99f5b3493'} />
        </div>
    );
};

const ReportWithFilter: React.FC = () => {
    const [filterStrings, setFilterStrings] = useState<string[]>(null);

    const createFilter = (filters: string[]): IBasicFilter => {
        return {
            $schema: 'http://powerbi.com/product/schema#basic',
            target: {
                table: 'Dim_Commonlibrary_Projects',
                column: 'Project',
            },
            filterType: 1,
            operator: 'In',
            values: filters,
        };
    };

    const filter = useMemo(() => {
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
                        setFilterStrings(['Aasta Hansteen']);
                    }}
                >
                    Aasta Hansteen
                </Button>
                <Button
                    onClick={() => {
                        setFilterStrings(['Bauge']);
                    }}
                >
                    Bauge
                </Button>
                <Button
                    onClick={() => {
                        setFilterStrings(['Bauge', 'Aasta Hansteen']);
                    }}
                >
                    Aasta and Bauge
                </Button>
            </div>
            <div style={{ width: '100%', height: '100%' }}>
                <PowerBIReport
                    reportId={'2e90a309-625e-4396-9a5d-45e99f5b3493'}
                    filters={[filter]}
                />
            </div>
        </>
    );
};

storiesOf('Data/PowerBI Report', module)
    .addDecorator(withFusionStory('PowerBI Report'))
    .add('Report Standard', () => <ReportStandard />)
    .add('Report with filter', () => <ReportWithFilter />);
