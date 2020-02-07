import * as models from 'powerbi-models';

type ReportLevelFilters = models.ReportLevelFilters | null;

export type IBasicFilter = models.IBasicFilter;
export type IBasicFilterWithKeys = models.IBasicFilterWithKeys;
export type IAdvancedFilter = models.IAdvancedFilter;
export type IRelativeDateFuilter = models.IRelativeDateFilter;
export type ITupleFilter = models.ITupleFilter;

export default ReportLevelFilters;
