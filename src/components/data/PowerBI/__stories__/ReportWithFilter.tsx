import { IBasicFilter } from 'powerbi-models';
import { useState, useMemo, useRef } from 'react';

import { Button } from '../../../..';
import { PowerBIReportContext, PowerBI } from '../Report';
import { Debugger } from './debugger';

const filterz: IBasicFilter = {
    $schema: 'http://powerbi.com/product/schema#basic',
    target: {
        table: 'Dim_NCR_Open_Closed',
        column: 'NCRState',
    },
    filterType: 1,
    operator: 'In',
    values: ['Closed'],
};

const ReportWithFilter = () => {
    const [filterStrings, setFilterStrings] = useState<string[]>(null);
    const filter: IBasicFilter = useMemo(
        () =>
            filterStrings
                ? {
                      $schema: 'http://powerbi.com/product/schema#basic',
                      target: {
                          table: 'Dim_Commonlibrary_Projects',
                          column: 'Project',
                      },
                      filterType: 1,
                      operator: 'In',
                      values: filterStrings,
                  }
                : null,
        [filterStrings]
    );
    const contextRef = useRef<PowerBIReportContext>();
    return (
        <div style={{ display: 'flex', flexFlow: 'column', height: '100vh' }}>
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
                        setFilterStrings(['Filter on something that doesnt exist will empty report']);
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
            <div>
                <Debugger context={contextRef} />
            </div>
            <div style={{ width: '100%', height: '100%' }}>
                <PowerBI
                    reportId={'2e90a309-625e-4396-9a5d-45e99f5b3493'}
                    contextRef={contextRef}
                    filters={[filter]}
                ></PowerBI>
            </div>
        </div>
    );
};
