import {
  createAuthForPasswordFlow,
  createAuthForAnonymousSessionFlow,
} from "@commercetools/sdk-client-v2";
import fetch from "node-fetch";

let _credentials = null;

export function getOptions(
  headers = null,
  credentials?: { username: string; password: string }
) {
  let authMiddleware;
  let { destroy } = headers

  if (destroy == "true") _credentials = null;
  if (_credentials || credentials) {
    if (credentials) _credentials = credentials;
    authMiddleware = createAuthForPasswordFlow({
      host: "https://auth.us-east-2.aws.commercetools.com",
      //host: process.env.CTP_AUTH_URL,
      projectKey: process.env.CTP_PROJECT_KEY,
      credentials: {
        clientId: process.env.CTP_CLIENT_ID || '',
        clientSecret: process.env.CTP_CLIENT_SECRET || '',
        user: {
          ..._credentials,
        },
      },
      scopes: [`manage_project:${process.env.CTP_PROJECT_KEY}`],
      fetch,

      // host: process.env.CTP_AUTH_URL,
      // projectKey: process.env.CTP_PROEJCT_KEY,
      // credentials: {
      //   clientId: process.env.CTP_CLIENT_ID,
      //   clientSecret: process.env.CTP_CLIENT_SECRET,
      // },
      // scopes: ['manage_project:times-pro-training'],
      // fetch
    });
  } else {
    authMiddleware = createAuthForAnonymousSessionFlow({
      host: "https://auth.us-east-2.aws.commercetools.com",
      //host: process.env.CTP_AUTH_URL,
      projectKey: process.env.CTP_PROJECT_KEY || '',
      credentials: {
        clientId: process.env.CTP_CLIENT_ID || '',
        clientSecret: process.env.CTP_CLIENT_SECRET || '',
      },
      scopes: [`manage_project:${process.env.CTP_PROJECT_KEY}`],
      fetch,
    });
  }

  return {
    authMiddleware,
    projectKey: process.env.CTP_PROJECT_KEY,
    credentials: _credentials ? true : false,
    httpMiddlewareOptions: {
      host: "https://api.us-east-2.aws.commercetools.com",
      fetch,
    },
  };
}
