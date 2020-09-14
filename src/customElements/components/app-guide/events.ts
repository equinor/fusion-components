import { ApplicationGuidanceQuickFact } from './types';

type QuickFactEventData = {
    quickFact: ApplicationGuidanceQuickFact;
};

export class QuickFactEvent extends CustomEvent<QuickFactEventData> {
    constructor(typeArg: string, quickFact: ApplicationGuidanceQuickFact) {
        super(typeArg, { detail: { quickFact } });
    }
}

declare global {
    interface ElementEventMap {
        'quick-fact-updated': QuickFactEvent;
    }
}