import { OrgChartContextType } from "./context";




export function OrgChartContextProvider<T>(children:any){

    const initialState: OrgChartContextType<T> = {
        width: 0,
        height: 0,
        centerX: 0,
        centerY: 0,
        cardWidth: 0,
        cardHeight: 0,
        cardMargin: 0,
        rowMargin: 0,
        allNodes: [],
        asideRows: 0,
        childrenRows: 0,
    }
}