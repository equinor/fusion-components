import * as AdaptiveCards from 'adaptivecards';
import React from 'react';
import marked from 'marked';

type AdaptiveCardViewerProps = {
    /** The hostConfig object that is passed along to the native AdaptiveCards. [More Info](https://docs.microsoft.com/en-us/adaptive-cards/display/hostconfig) */
    hostConfig?: object;
    /** The card schema.  It must comply with the card schema. [More Info](https://docs.microsoft.com/en-us/adaptive-cards/create/cardschema) */
    payload: object;
    /** Method that will be invoked anytime a card action is executed. [More Info](https://docs.microsoft.com/en-us/adaptive-cards/display/implementingrenderer#actions) */
    onExecuteAction?: (action: AdaptiveCards.Action) => void;
    /** Method that will be invoked when a Submit action is executed. [More Info](https://docs.microsoft.com/en-us/adaptive-cards/display/implementingrenderer#actionsubmit) */
    onActionSubmit?: (action: AdaptiveCards.Action) => void;
    /** Method that will be invoked when an Open Url action is executed. [More Info](https://docs.microsoft.com/en-us/adaptive-cards/display/implementingrenderer#actionopenurl) */
    onActionOpenUrl?: (action: AdaptiveCards.Action) => void;
    /** Method that will be invoked when a Show Card action is executed. [More Info](https://docs.microsoft.com/en-us/adaptive-cards/display/implementingrenderer#actionshowcard) */
    onActionShowCard?: (action: AdaptiveCards.Action) => void;
    /** CSS classes that will bew applied to the card container */
    className?: string;
};

const ACTION_OPEN_URL = 'Action.OpenUrl';
const ACTION_SHOW_CARD = 'Action.ShowCard';
const ACTION_SUBMIT = 'Action.Submit';

const AdaptiveCardViewer: React.FC<AdaptiveCardViewerProps> = ({
    hostConfig,
    payload,
    onExecuteAction,
    onActionOpenUrl,
    onActionShowCard,
    onActionSubmit,
    className,
}) => {
    const adaptiveCard = React.useMemo(() => new AdaptiveCards.AdaptiveCard(), []);

    AdaptiveCards.AdaptiveCard.onProcessMarkdown = (text, result) => {
        result.outputHtml = marked(text);
        result.didProcess = true;
    };

    if (hostConfig) {
        adaptiveCard.hostConfig = new AdaptiveCards.HostConfig(hostConfig);
    }

    const executeAction = React.useCallback(
        (action: AdaptiveCards.Action) => {
            switch (action.getJsonTypeName()) {
                case ACTION_OPEN_URL:
                    onActionOpenUrl
                        ? onActionOpenUrl(action)
                        : window.open(action.getHref(), action.title || '_blank');
                    break;
                case ACTION_SHOW_CARD:
                    onActionShowCard && onActionShowCard(action);
                    break;
                case ACTION_SUBMIT:
                    onActionSubmit && onActionSubmit(action);
                    break;
            }
            onExecuteAction && onExecuteAction(action);
        },
        [onExecuteAction, onActionOpenUrl, onActionShowCard, onActionSubmit]
    );

    adaptiveCard.onExecuteAction = executeAction;

    const result = React.useMemo(() => {
        adaptiveCard.parse(payload);
        return adaptiveCard.render();
    }, [payload]);

    const appendNewChild = React.useCallback(
        (n: HTMLElement) => {
            n.firstChild && n.removeChild(n.firstChild);
            n.appendChild(result);
        },
        [result]
    );

    const jsxAdaptiveCard = React.useMemo(
        () => <div className={className} ref={n => n && appendNewChild(n)} />,
        [result, className]
    );

    return jsxAdaptiveCard;
};

export default AdaptiveCardViewer;
