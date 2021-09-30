import { StatusFilterType } from '../helpers';

type Codes = {
    [key: string]: StatusFilterType[];
    statuses: StatusFilterType[];
};

export default Codes;
