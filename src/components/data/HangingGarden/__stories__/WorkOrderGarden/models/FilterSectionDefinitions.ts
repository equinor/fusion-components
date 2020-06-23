import { createCheckBoxesFilter, followUpStatusFilters } from "../helpers";
import WorkOrderType from "./WorkOrderType";
import { FilterSection, FilterTypes } from "@equinor/fusion-components";
import { getStatus } from "../filter/filter";

const FilterSectionDefinitions: FilterSection<WorkOrderType>[] = [
    {
        key: "search",
        title: "",
        isCollapsible: false,
        filters: [
            {
                key: "search",
                title: "",
                type: FilterTypes.Search,
                getValue: item => item.searchableValues,
            },
        ],
    },
    {
        key: "subprojects",
        title: "Projects (ProCoSys)",
        isCollapsible: true,
        filters: [
            {
                key: "projectIdentifier",
                title: "",
                type: FilterTypes.Checkbox,
                isCollapsible: true,
                isCollapsed: false,
                isVisibleWhenPaneIsCollapsed: true,
                getValue: (item: WorkOrderType) => item["projectIdentifier"],
                options: [],
            },
        ],
    },
    {
        key: "group-by",
        title: "Group by",
        isCollapsible: true,
        isCollapsed: false,
        filters: [
            {
                key: "group-by",
                title: "",
                type: FilterTypes.Radio,
                isVisibleWhenPaneIsCollapsed: true,
                getValue: item => "",
                options: [
                    {
                        key: "wp",
                        label: "Workpackages production",
                    },
                    {
                        key: "hwp",
                        label: "Hours ready for execution at site",
                    },
                    {
                        key: "fwp",
                        label: "Finalizing of workpackages at site",
                    },
                    {
                        key: "responsibleCode",
                        label: "Responsible",
                    },
                    {
                        key: "disciplineCode",
                        label: "Discipline",
                    },
                    {
                        key: "milestoneCode",
                        label: "Milestone",
                    },
                ],
            },
        ],
    },
    {
        key: "filters",
        title: "Filters",
        isCollapsible: true,
        filters: [
            {
                key: "status",
                title: "Status",
                type: FilterTypes.Checkbox,
                isCollapsible: true,
                isCollapsed: true,
                isVisibleWhenPaneIsCollapsed: true,
                getValue: item => getStatus(item),
                options: followUpStatusFilters,
            },
            createCheckBoxesFilter("responsibleCode", "Responsible"),
            createCheckBoxesFilter("disciplineCode", "Discipline"),
            createCheckBoxesFilter("milestoneCode", "Milestone"),
        ],
    },
];

export default FilterSectionDefinitions;
