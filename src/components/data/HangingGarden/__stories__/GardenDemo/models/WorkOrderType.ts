 type WorkOrderType =  {
  [index: string]: any;
  siteCodes: string[];
  projectIdentifier: string;
  workOrderNumber: string;
  description: string;
  disciplineCode: string;
  discipline: string
  responsibleCode: string;
  responsible: string;
  milestone: string;
  milestoneCode: string;
  onshore: boolean;
  offshore: boolean;
  materialStatus: string;
  plannedStartDate: string;
  plannedFinishDate: string;
  w1ActualDate: string;
  w2ActualDate: string;
  w3ActualDate: string;
  w4ActualDate: string;
  w5ActualDate: string;
  w6ActualDate: string;
  w7ActualDate: string;
  w8ActualDate: string;
  w9ActualDate: string;
  w10ActualDate: string;
  commpkgNumber: string;
  workOrderId: string;
  proCoSysSiteName: string;
  materialComments: string;
  constructionComments: string;
  projectProgress: string;
  estimatedHours: number;
  remainingHours: number;
  expendedHours: number;
  url: string;
  order: number;
  hourType: string;
  mccrStatus: string;
  holdBy: string;
  holdByDescription: string;
  date: string;
  rowKey: string;
  searchableValues: string;  
  projectDescription:string;
}

export default WorkOrderType
