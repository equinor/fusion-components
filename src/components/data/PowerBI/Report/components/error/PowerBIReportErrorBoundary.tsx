import { useContext, PropsWithChildren } from 'react';

import { ErrorMessage } from '@equinor/fusion-components';

import { useSelector } from '@equinor/fusion/lib/epic';

import { ApiError } from '../../store/actions';
import { context } from '../../context';

import { processActionError } from './process-action-error';
import PowerBIReportInfo from '../../../ReportInfo';

type PowerBIReportErrorBoundryProps = PropsWithChildren<{}>;

// TODO: move me
const compareArray = (a: ApiError[], b: ApiError[]): boolean =>
    a.length === b.length && a.every((value, index) => value.action === b[index].action);

export const PowerBIReportErrorBoundary: React.FC<PowerBIReportErrorBoundryProps> = (
    props: PowerBIReportErrorBoundryProps
) => {
    const { store } = useContext(context);

    const id = useSelector(store, 'id');
    const errors = useSelector(store, 'errors', compareArray);
    if (errors?.find(({ error }) => error.statusCode === 403)) {
        return <PowerBIReportInfo id={id || ''} />;
    }
    if (errors?.length) {
        const { title, message, type } = processActionError(errors[0]);
        return <ErrorMessage hasError={true} title={title} message={message} errorType={type} />;
    }

    return <>{props.children}</>;
};

export default PowerBIReportErrorBoundary;
