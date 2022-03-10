import * as React from 'react';

import * as styles from './styles.less';
import classNames from 'classnames';
import {
    Spinner,
    CloseIcon,
    ErrorIcon,
    DoneIcon,
    useTooltipRef,
    IconButton,
    Button,
    ModalSideSheet,
    Accordion,
    AccordionItem,
} from '@equinor/fusion-components';

export type FailedRequest<T> = {
    item: T;
    errorMessage: string;
    isEditable: boolean;
};

export type SuccessfulRequest<T, TResponse> = {
    item: T;
    response: TResponse;
};

export type RenderRequestProps<TRequest> = {
    request: TRequest;
};
type RequestProgressSideSheetProps<TRequest, TResponse> = {
    title: string;
    pendingRequests: TRequest[];
    failedRequests: FailedRequest<TRequest>[];
    successfulRequests: SuccessfulRequest<TRequest, TResponse>[];
    renderRequest: React.FC<RenderRequestProps<TRequest>>;
    onRemoveFailedRequest: (request: FailedRequest<TRequest>) => void;
    onClose: () => void;
};
type RequestItemProps<TRequest> = {
    request: TRequest;
    renderRequest: React.FC<RenderRequestProps<TRequest>>;
};

type FailedRequestItemProps<TRequest> = RequestItemProps<TRequest> & {
    errorMessage: string;
    onRemove: () => void;
};

type SuccessfulRequestItemProps<TRequest, TResponse> = RequestItemProps<TRequest> & {
    response: TResponse;
};

function PendingRequestProgressItem<TRequest>({
    request,
    renderRequest,
}: RequestItemProps<TRequest>) {
    return (
        <div className={classNames(styles.item, styles.pending)}>
            <div className={styles.icon}>
                <Spinner inline size={24} />
            </div>
            <div className={styles.content}>{renderRequest({ request })}</div>
        </div>
    );
}

function InvalidRequestProgressItem<TRequest>({
    request,
    renderRequest,
    onRemove,
    errorMessage,
}: FailedRequestItemProps<TRequest>) {
    const ignoreTooltipRef = useTooltipRef('Ignore');
    return (
        <div className={classNames(styles.item, styles.failed)}>
            <div className={styles.icon}>
                <IconButton onClick={onRemove} ref={ignoreTooltipRef}>
                    <CloseIcon />
                </IconButton>
            </div>
            <div className={styles.icon}>
                <ErrorIcon outline={false} />
            </div>
            <div className={styles.content}>{renderRequest({ request })}</div>
            <div className={styles.errorMessage}>
                <div className={styles.errorMessage}>{errorMessage}</div>
            </div>
        </div>
    );
}

function FailedRequestProgressItem<TRequest>({
    request,
    renderRequest,
    onRemove,
    errorMessage
}: FailedRequestItemProps<TRequest>) {
    const ignoreTooltipRef = useTooltipRef('Ignore');
    return (
        <div className={classNames(styles.item, styles.failed)}>
            <div className={styles.icon}>
                <IconButton onClick={onRemove} ref={ignoreTooltipRef}>
                    <CloseIcon />
                </IconButton>
            </div>
            <div className={styles.icon}>
                <ErrorIcon outline={false} />
            </div>
            <div className={styles.content}>{renderRequest({ request })}</div>
            <div className={styles.errorMessage}>
                <div className={styles.errorMessage}>{errorMessage}</div>
            </div>
        </div>
    );
}

function SuccessfulRequestProgressItem<TRequest, TResponse>({
    request,
    renderRequest,
}: SuccessfulRequestItemProps<TRequest, TResponse>) {
    return (
        <div className={classNames(styles.item, styles.successful)}>
            <div className={styles.icon}>
                <DoneIcon />
            </div>
            <div className={styles.content}>{renderRequest({ request })}</div>
        </div>
    );
}
function ProgressSideSheet<TRequest, TResponse>({
    title,
    pendingRequests,
    failedRequests,
    successfulRequests,
    renderRequest,
    onRemoveFailedRequest,
    onClose,
}: RequestProgressSideSheetProps<TRequest, TResponse>) {
    const [isPendingRequestsOpen, setIsPendingRequestsOpen] = React.useState(true);
    const [isSuccessfulRequestsOpen, setIsSuccessfulRequestsOpen] = React.useState(true);

    const invalidRequests = React.useMemo(() => failedRequests.filter((fr) => fr.isEditable), [
        failedRequests,
    ]);
    const requestsWithError = React.useMemo(() => failedRequests.filter((fr) => !fr.isEditable), [
        failedRequests,
    ]);
    const [isShowing, setIsShowing] = React.useState(false);
    React.useEffect(() => {
        setIsShowing(
            pendingRequests.length > 0 || failedRequests.length > 0 || successfulRequests.length > 0
        );
    }, [pendingRequests, failedRequests, successfulRequests]);

    const closeSideSheet = React.useCallback(() => {
        setIsShowing(false);
        onClose();
    }, [onClose]);

    React.useEffect(() => {
        if (isShowing && failedRequests.length === 0) {
            closeSideSheet();
        }
    }, [failedRequests, closeSideSheet]);
    return (
        <ModalSideSheet header={title} show={isShowing} onClose={onClose}>
            {invalidRequests.length > 0 && (
                <div className={styles.failedRequests}>
                    <div className={styles.header}>
                        <h3>Invalid requests</h3>
                        <Button onClick={closeSideSheet}>Edit failed</Button>
                    </div>
                    <div className={styles.progressList}>
                        {invalidRequests.map((request, index) => (
                            <InvalidRequestProgressItem
                                key={index.toString()}
                                request={request.item}
                                errorMessage={request.errorMessage}
                                renderRequest={renderRequest}
                                onRemove={() => onRemoveFailedRequest(request)}
                            />
                        ))}
                    </div>
                </div>
            )}
            {requestsWithError.length > 0 && (
                <div className={styles.failedRequests}>
                    <div className={styles.header}>
                        <h3>Failed requests</h3>
                    </div>
                    <div className={styles.progressList}>
                        {requestsWithError.map((request, index) => (
                            <FailedRequestProgressItem
                                key={index.toString()}
                                request={request.item}
                                errorMessage={request.errorMessage}
                                renderRequest={renderRequest}
                                onRemove={() => onRemoveFailedRequest(request)}
                            />
                        ))}
                    </div>
                </div>
            )}
            <div className={styles.accordionContainer}>
                <Accordion>
                    {pendingRequests.length > 0 && (
                        <AccordionItem
                            label={`In progress (${pendingRequests.length})`}
                            isOpen={isPendingRequestsOpen}
                            onChange={() => setIsPendingRequestsOpen(!isPendingRequestsOpen)}
                        >
                            <div className={styles.progressList}>
                                {pendingRequests.map((request, index) => (
                                    <PendingRequestProgressItem
                                        key={index.toString()}
                                        request={request}
                                        renderRequest={renderRequest}
                                    />
                                ))}
                            </div>
                        </AccordionItem>
                    )}
                    {successfulRequests.length > 0 && (
                        <AccordionItem
                            label={`Successful (${successfulRequests.length})`}
                            isOpen={isSuccessfulRequestsOpen}
                            onChange={() => setIsSuccessfulRequestsOpen(!isSuccessfulRequestsOpen)}
                        >
                            <div className={styles.progressList}>
                                {successfulRequests.map((request, index) => (
                                    <SuccessfulRequestProgressItem
                                        key={index.toString()}
                                        request={request.item}
                                        response={request.response}
                                        renderRequest={renderRequest}
                                    />
                                ))}
                            </div>
                        </AccordionItem>
                    )}
                </Accordion>
            </div>
        </ModalSideSheet>
    );
}

export default ProgressSideSheet;
