import { FusionApiHttpErrorResponse } from "@equinor/fusion";

type FusionError = {
    statusCode: number,
    fusionError?: FusionApiHttpErrorResponse,
};

export default FusionError;
