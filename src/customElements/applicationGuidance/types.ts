export type ApplicationGuidanceAnchorRect = {
    top: number;
    left: number;
    width: number;
    height: number;
};

export type ApplicationGuidanceAnchor = {
    id: string;
    scope: string | null;
    rect: ApplicationGuidanceAnchorRect;
};

export type ApplicationGuidanceMessage =
    | {
          type?: 'application-guide-anchor-rect';
          rect: ApplicationGuidanceAnchorRect;
          anchorId: string;
          scope: string | null;
      }
    | {
          type?: 'application-guidance-anchor-unmounted';
          anchorId: string;
      }
    | {
          type?: 'application-guidance-active';
          isActive: boolean;
      }
    | {
          type?: 'application-guidance-anchor-activated';
          anchorId: string;
      }
    | {
          type?: 'application-guidance-scope';
          scope: ApplicationGuidanceScope;
          isActive: boolean;
      };

export type ApplicationGuidanceQuickFact = {
    anchor: string;
    title: string;
    slug: string;
    contentUrl: string;
    path: string;
    created: Date;
    createdBy: { azureUniqueId: string; mail: string | null; name: string };
    bodyMarkdown: string;
    collectionPath: string;
};

export type ApplicationGuidanceQuickFactCollection = {
    id: string;
    name: string;
    order: any;
    created: Date;
    createdBy: { azureUniqueId: string; mail: string | null; name: string };
    collections: { id: string }[];
    documents: { id: string }[];
    quickTips: ApplicationGuidanceQuickFact[];
};

export type ApplicationGuidanceScopeIsolation = 'none' | 'isolated' | 'global';

export type ApplicationGuidanceScope = {
    id: string;
    isolation: ApplicationGuidanceScopeIsolation;
};

type QuickFactEventData = {
    quickFact: ApplicationGuidanceQuickFact;
};

export class QuickFactEvent extends CustomEvent<QuickFactEventData> {
    constructor(typeArg: string, quickFact: ApplicationGuidanceQuickFact) {
        super(typeArg, { detail: { quickFact } });
    }
}
