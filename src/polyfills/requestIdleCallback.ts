interface RequestIdleCallback {
    didTimeout?: boolean;
    timeRemaining?(): DOMHighResTimeStamp;
}

interface RequestIdleCallbackOptions {
    timeout?: number;
}

type RequestIdleCallbackId = NodeJS.Timeout;

interface Window {
    requestIdleCallback(
        cb: (deadline: RequestIdleCallback) => any,
        options?: RequestIdleCallbackOptions
    ): RequestIdleCallbackId;
    cancelIdleCallback(id: RequestIdleCallbackId): void;
}

window.requestIdleCallback =
    window.requestIdleCallback ||
    ((callback) => {
        var start = Date.now();
        return setTimeout(function () {
            callback({
                didTimeout: false,
                timeRemaining: function () {
                    return Math.max(0, 50 - (Date.now() - start));
                },
            });
        }, 1);
    });

window.cancelIdleCallback =
    window.cancelIdleCallback ||
    ((id) => {
        clearTimeout(id);
    });
