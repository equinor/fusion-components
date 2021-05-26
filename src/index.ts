// Polyfills
import './polyfills';

// Core components
export { default as FusionHeader, HeaderContentProps } from './components/core/Header';
export { default as HeaderContentPortal } from './components/core/Header/HeaderContentPortal';
export { default as HeaderAppAsidePortal } from './components/core/Header/HeaderAppAsidePortal';
export { default as FusionRoot } from './components/core/Root';
export { default as FusionContent } from './components/core/Content';
export { default as FusionContainer } from './components/core/Container';
export { default as ContextSelector } from './components/core/ContextSelector';
export { default as AppWrapper } from './components/core/AppWrapper';
export { default as NotificationSnacks } from './components/core/NotificationSnacks';
export { default as NotificationBanner } from './components/core/NotificationBanner';
export { default as NotificationDialog } from './components/core/NotificationDialog';

// Data components
export { default as DataTable, DataTableColumn } from './components/data/DataTable';
export {
    default as PowerBIReport,
    ReportLevelFilters,
    IBasicFilter,
    IBasicFilterWithKeys,
    IAdvancedFilter,
    IRelativeDateFuilter,
    ITupleFilter,
} from './components/data/PowerBIReport';
export {
    default as HangingGarden,
    HangingGardenProps,
    HangingGardenColumn,
    ItemRenderContext,
    RenderItem,
    useHangingGardenData,
    useHangingGardenErrorMessage,
    useHangingGardenGetData,
    PIXI,
} from './components/data/HangingGarden';

// General components
export { default as Button, ButtonProps } from './components/general/Button';
export { default as IconButton } from './components/general/IconButton';
export { default as ErrorBoundary } from './components/general/ErrorBoundary';
export { default as ErrorMessage } from './components/general/ErrorMessage';
export { default as Menu, MenuItemType, MenuSection } from './components/general/Menu';
export { Tabs, Tab } from './components/general/Tabs';
export { Stepper, Step } from './components/general/Stepper';
export { default as TextInput } from './components/general/TextInput';
export { default as TextArea } from './components/general/TextArea';
export { Switch, CheckBox, RadioButton } from './components/general/SelectionControls';
export {
    default as Pagination,
    PaginationSkeleton,
    PaginationChangeHandler,
} from './components/general/Pagination';
export {
    default as FilterPane,
    FilterTypes,
    applyFilters,
    FilterTerm,
    FilterSection,
    Count,
    FilterCount,
} from './components/general/FilterPane';
export {
    default as Dropdown,
    useDropdownController,
    DropdownController,
} from './components/general/Dropdown';
export { default as Select, SelectOption, SelectSection } from './components/general/Select';
export {
    default as SearchableDropdown,
    SearchableDropdownOption,
    SearchableDropdownSection,
} from './components/general/SearchableDropdown';
export { ModalSideSheet, SideSheet } from './components/general/SideSheet';
export { default as Scrim } from './components/general/Scrim';
export { default as Calendar } from './components/general/Calendar';
export { default as Chip } from './components/general/Chip';
export { default as DatePicker } from './components/general/DatePicker';
export { Slider, RangedSlider, SliderMarker } from './components/general/Slider';
export { default as RequestWorkflow } from './components/general/RequestWorkflow';
export {
    Workflow,
    WorkflowStep,
    WorkflowProvisioningStatus,
    WorkflowProvisioningState,
    WorkflowPerson,
} from './components/general/RequestWorkflow/models';
export {
    default as NavigationDrawer,
    NavigationStructure,
} from './components/general/NavigationDrawer';
export { default as Accordion, AccordionItem } from './components/general/Accordion';
export {
    default as PersonPhoto,
    PhotoSize,
    AccountTypeIcon,
    PersonPresenceIcon,
} from './components/people/PersonPhoto';
export { default as PersonCard } from './components/people/PersonCard';
export { default as PersonPicker, SectionFnProps } from './components/people/PersonPicker';
export { default as PersonPositionCard } from './components/people/PersonPositionCard';
export { default as PersonDetail } from './components/people/PersonDetail';
export { default as PersonPositionList } from './components/people/PersonPositionList';
export { default as PersonRoleList } from './components/people/PersonRoleList';

export { default as MarkdownViewer } from './components/general/MarkdownViewer';
export { default as AdaptiveCardViewer } from './components/general/AdaptiveCardViewer';
export {
    default as PopoverContainer,
    PopoverPlacement,
    PopoverJustification,
    PopoverContainerProps,
} from './components/general/PopoverContainer';
export { default as NotificationsSideSheet } from './components/general/NotificationsSideSheet';
export { StandardNotificationCard } from './components/general/NotificationCardComponent';
export { default as MarkdownEditor } from './components/general/MarkdownEditor';
export { default as AppSettingsManager } from './components/general/AppSettingsManager';
export { default as BookmarksManager } from './components/general/BookmarksManager';

// Feedback components
export { default as Spinner } from './components/feedback/Spinner';
export { default as Banner } from './components/feedback/Banner';
export { Dialog, DialogActions, DialogContent, DialogTitle } from './components/feedback/Dialog';
export { default as Snackbar } from './components/feedback/Snackbar';
export { SkeletonBar, SkeletonButton, SkeletonDisc } from './components/feedback/Skeleton';
export { default as NotificationCards } from './components/feedback/NotificationCards';

// Hooks
export { default as useElevationClassName, Elevation } from './hooks/useElevationClassName';
export { default as usePopoverRef } from './hooks/usePopoverRef';
export { default as useTooltipRef } from './hooks/useTooltipRef';
export { default as useClickOutsideOverlayPortal } from './hooks/useClickOutsideOverlayPortal';
export { default as useClickToggleController } from './hooks/useClickToggleController';
export { default as useEventListener } from './hooks/useEventListener';
export { default as useHoverToggleController } from './hooks/useHoverToggleController';
export { default as useKeyboardNavigation } from './hooks/useKeyboardNavigation';
export { default as useOverlayContainer } from './hooks/useOverlayContainer';
export { default as useOverlayPortal } from './hooks/useOverlayPortal';
export { default as useRelativePortal } from './hooks/useRelativePortal';
export { default as useRelativePositioning } from './hooks/useRelativePositioning';
export { default as useBreakpoint } from './hooks/useBreakpoint';
export { default as useHorizontalBreakpoint } from './hooks/useHorizontalBreakpoint';
export { default as useSizeBreakpoint } from './hooks/useSizeBreakpoint';
export { default as useVerticalBreakpoint } from './hooks/useVerticalBreakpoint';
export { default as useRootContainer } from './hooks/useRootContainer';
export { default as useFullscreen } from './hooks/useFullscreen';
export {
    default as useStringMask,
    applyStringMask,
    unmaskString,
    StringMaskToken,
} from './hooks/useStringMask';
export { default as useParentSize } from './hooks/useParentSize';

// Org
export { default as PositionCard } from './components/org/PositionCard';
export {
    default as OrgChart,
    OrgStructure,
    OrgChartItemProps,
    OrgNode,
} from './components/org/OrgChart';
export { default as ReportingPath } from './components/org/ReportingPath';
export { default as PositionPicker } from './components/org/PositionPicker';

// Icons
export { default as useIcon, IconProps } from './hooks/useIcon';
export { WarningIcon, ErrorIcon, NotificationIcon } from './components/icons/components/alert';
export { AddIcon, BlockIcon, SaveIcon, CopyIcon } from './components/icons/components/content';
export {
    SyncDisabledIcon,
    SyncIcon,
    NotificationsIcon,
} from './components/icons/components/notification';
export {
    SearchIcon,
    DoneIcon,
    SortIcon,
    MinimizeIcon,
    DropdownArrow,
    CollapseIcon,
    CalendarIcon,
    HistoryIcon,
    InfoIcon,
    OpenInNewIcon,
    SettingsIcon,
    HelpIcon,
    PrintIcon,
    DeleteIcon,
    LockIcon,
    CheckCircleIcon,
    CloseCircleIcon,
    ScheduleIcon,
    BookmarksIcon,
    RemoveCircleIcon,
    CircleIcon,
    CalendarAcceptIcon,
    CalendarEventIcon,
    FullscreenIcon,
    FullscreenExitIcon,
    ShareIcon,
} from './components/icons/components/action';
export {
    PaginationArrow,
    CloseIcon,
    ExpandMoreIcon,
    ArrowBackIcon,
    ArrowForwardIcon,
    ArrowDownwardIcon,
    ArrowUpwardIcon,
    MoreIcon,
    SubdirectoryArrowRightIcon,
    SubdirectoryArrowLeftIcon,
    ExitToAppIcon,
} from './components/icons/components/navigation';
export { PeopleIcon } from './components/icons/components/social';
export { PlayIcon, PauseCircleIcon } from './components/icons/components/av';
export { EditIcon } from './components/icons/components/image';
export {
    FormatBoldIcon,
    FormatBulletedListIcon,
    FormatItalicsIcon,
    FormatNumberedListIcon,
    LinkIcon,
    TitleIcon,
} from './components/icons/components/wysiwyg';
export { StarIcon } from './components/icons/components/toggle';
export { PlatformIcon } from './components/icons/components/uncategorized';
export {
    ColumnViewIcon,
    GridViewIcon,
    ListViewIcon,
    WorkIcon,
} from './components/icons/components/view';
export { SecurityIcon } from './components/icons/components/security';
export { DelveIcon } from './components/icons/components/o365';

// Styling
export { default as styling } from './styles/styling';

// Utils
export { default as RelativeOverlayPortal } from './components/utils/RelativeOverlayPortal';
export { default as OverlayPortal } from './components/utils/OverlayPortal';

// Application guidance
export * from './components/general/ApplicationGuidance';

// @TODO fix me later
import './customElements/index.ts';
