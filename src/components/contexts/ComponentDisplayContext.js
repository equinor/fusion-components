import { createNamedContext } from "../utils/NamedContext";

export const componentDisplayTypes = {
    compact: "COMPONENT_DISPLAY_TYPE_COMPACT",
    comfortable: "COMPONENT_DISPLAY_TYPE_COMFORTABLE",
};

export const componentDisplayTypeClassNames = (displayType, styles) => ({
    [styles.compact]: displayType === componentDisplayTypes.compact,
    [styles.comfortable]: displayType === componentDisplayTypes.comfortable,
});

export default createNamedContext("fusion-display-type-context", componentDisplayTypes.comfortable);