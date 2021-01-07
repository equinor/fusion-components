# Power BI

## Report

Component for displaying an Power BI report.
The context of the provided can be accessed by providing an context ref.

```tsx
const contextRef = React.useRef<PowerBIReportContext>();
return (
    <div style={{ width: '100%', height: '500px' }}>
        <PowerBI reportId={'xxx-xxx-xxxx'} contextRef={contextRef}></PowerBI>
    </div>
);
```

```tsx
// inspect context streams
useEffect(() => {
    if (!context.current) return;
    const { store, metrics, event$ } = context.current;
    const sub = new Subscription();
    metrics && sub.add(metrics.subscribe((a) => console.log('METRIC:', a)));
    sub.add(store.subscribe((a) => console.log('STATE:', a)));
    sub.add(
        store.state$
            .pipe(
                pluck('token'),
                distinctUntilChanged(),
                filter((a) => !!a)
            )
            .subscribe((token) => {
                const expiresIn = Math.floor((token!.expirationUtc.getTime() - Date.now()) / 60000);
                console.log(`TOKEN: expires ${token!.expirationUtc} in ${expiresIn} minutes`);
            })
    );
    sub.add(event$.subscribe((x) => console.log('PBI-EVENT:', x)));
    sub.add(store.action$.subscribe((a) => console.log('ACTION:', a)));
    return () => sub.unsubscribe();
}, [context.current]);
```

```tsx
// access embedded component
const component = context.current?.component?.current;
const reload = () => component && component.reload();
```

### PowerBIReportProvider

Components for containing the context of a report.
This component contains the data store, metrics, embed component and embed event stream.

### PowerBIReportView
Uses the context to create config and displays embedded component

### PowerBIReportErrorBoundry
Wrapper for catching errors from store. on 403 this will display the `PowerBIReportInfo` component

### PowerBIBookmark
Uses context to create and apply bookmark for reports

### PowerBIStatus
displays verbal which phase the store is in
```ts
enum Status {
  LoadingEmbedInfo,
  AcquiringAccessToken,
  AccessCheck,
}
```

## Report Info

displays information about an report, this is usally shown when an user is not authorized to see the report.
```tsx
return (<PowerBIReportInfo id="xxxxx-xxx-xxx" />)
```
