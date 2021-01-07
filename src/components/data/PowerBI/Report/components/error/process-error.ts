import { ApiError } from '../../store/actions';

import { ErrrorProperties } from '.';

export const processError = (error: ApiError['error']): ErrrorProperties => {
  switch (Number(error.statusCode)) {
    case 401:
      return {
        type: 'accessDenied',
        title: 'Sorry, we could not authorize you.',
        message: 'Your browser session most likely expired, Please try to refresh the browser',
      };
    case 404:
      return {
        type: 'notFound',
        message: 'requested resource does not exist',
      };
    case 424:
      return {
        type: 'failedDependency',
        message: 'We had problems communicate with Microsoft Power BI services',
      };
    case 429:
      return {
        type: 'throttle',
        message: 'We recorded too many requests from your client, please try again in one minute',
      };
    default:
      return error.statusCode < 500
        ? {
          message: 'An unexpected error occurred... :(',
        }
        : {
          message:
            'An error occurred while communicating with the fusion services... Please try again in a few minutes. If the problem persists, please raise an incident...',
        };
  }
};

export default processError;