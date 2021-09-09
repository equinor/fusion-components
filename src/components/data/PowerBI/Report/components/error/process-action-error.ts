import { getType } from 'typesafe-actions';

import { ApiError, actions } from '../../store/actions';

import { ErrrorProperties } from '.';
import { processError } from './process-error';

export const processActionError = ({ error, action }: ApiError): ErrrorProperties => {
  const code = Number(error.statusCode);
  const options = processError(error);
  switch (action.type) {
      case getType(actions.fetchEmbedInfo.request): {
          const title = 'Sorry we could load the Power BI embedding information for the report';
          switch (code) {
              case 403:
                  return {
                      ...options,
                      title,
                      type: 'accessDenied',
                      message: 'You do not have access to view the report',
                  };
              case 404:
                  return {
                      ...options,
                      title,
                      type: 'notFound',
                      message: 'The report does not exist',
                  };
              default:
                  return { ...options, title };
          }
      }
  }
  return options;
};

export default processActionError;