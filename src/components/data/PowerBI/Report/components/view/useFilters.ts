import { useEffect } from 'react';

import { Observable } from 'rxjs';
import { filter, first, switchMapTo } from 'rxjs/operators';

import { Report, models } from 'powerbi-client';

import { PowerBIEmbedEvents, PowerBIEmbedEventEntry } from '../../context';

const nextRender = (event$: Observable<PowerBIEmbedEventEntry>) => {
  return event$.pipe(
    filter(x => x.type === PowerBIEmbedEvents.rendered),
    first(),
  );
}

const resetClick = (event$: Observable<PowerBIEmbedEventEntry>) => {
  return event$.pipe(
    filter(x => x.type === PowerBIEmbedEvents.buttonClicked),
    filter(x => x.event.detail.title?.toLowerCase() === 'reset filter'),
    switchMapTo(nextRender(event$))
  );
}

export const usePowerBIFilters = (
  event$: Observable<PowerBIEmbedEventEntry>,
  filters?: models.IFilter[]
) => {
  useEffect(() => {
    if (!filters) return;
    const subscription = resetClick(event$).subscribe(({ entity }) => (entity as Report).setFilters(filters));
    return () => subscription.unsubscribe();
  }, [event$, filters]);
};

export default usePowerBIFilters;