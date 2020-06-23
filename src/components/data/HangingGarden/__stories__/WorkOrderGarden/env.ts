import { FusionEnvironment } from "@equinor/fusion";

export const getDataProxyBaseUrl = (env: FusionEnvironment) => {
    switch (env.env) {
        case "FQA":
            return "https://pro-s-dataproxy-fqa.azurewebsites.net";

        case "FPRD":
            return "https://pro-s-dataproxy-fprd.azurewebsites.net";
        default:
            return "https://pro-s-dataproxy-ci.azurewebsites.net";
    }
};
