import { StatusFilterType } from '../helpers';

type Codes = {
  [key:string]:StatusFilterType[]
  disciplineCode: StatusFilterType[],
  responsibleCode: StatusFilterType[],
  milestoneCode: StatusFilterType[],
  statuses: StatusFilterType[],
  siteCodes: StatusFilterType[],
};

export default Codes