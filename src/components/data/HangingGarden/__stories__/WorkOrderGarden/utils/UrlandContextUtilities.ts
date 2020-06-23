import { useFusionContext } from "@equinor/fusion";
import { Context } from "@equinor/fusion";

export const getActiveTabFromUrl = (): string => {
    return useFusionContext().history.location.pathname.indexOf("contractmilestones") !== -1
        ? "contractmilestones"
        : "workordergarden";
};

export const getProjectSearchTermFromPDPcontext = (words = 2): string | null => {
    const pdpContext = getFusionContextKey();
    if (!pdpContext) return null;

    const projectName =
        pdpContext?.type === "fusion-project" && pdpContext?.value?.currentProject?.name
            ? pdpContext.value.currentProject.name as string
            : null;

    if (!projectName) return null;

    const searchTerm = projectName.split(" ");
    if(searchTerm.length < words) return searchTerm[0]

    let joinedSeachTerm = searchTerm[0]
    for (let i = 1;i < words;i++){
        joinedSeachTerm += " " + searchTerm[i]
    }   

    return joinedSeachTerm
}


export const findSingleContext = (contexts:Context[]) : Context | null => {

    if (contexts.length === 1) {
     return contexts[0]
    } else if (contexts.length > 1) {
        const projectSearchTerm = getProjectSearchTermFromPDPcontext(3);
        const filteredContexts = contexts.filter(c =>
            c.title.toLocaleLowerCase().startsWith(projectSearchTerm?.toLocaleLowerCase() || "")
        );
        if (filteredContexts.length === 1)
            return filteredContexts[0];
    }
    return null
}

export const getFusionContextKey = (): any | null => {
    const pdpContextString = localStorage.getItem("FUSION_GLOBAL_CONTEXT_KEY");
    if (!pdpContextString) return null;
    const pdpContext = { ...JSON.parse(pdpContextString) };
    return pdpContext || null;
};
