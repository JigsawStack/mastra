import { Config } from '@arkw/core';
import { SlackIntegration } from '@arkw/slack';
import { XIntegration } from '@arkw/x';

export const config: Config = {
  name: 'twitter-client',
  //logConfig: {}, // TODO: Add this
  systemActions: [],
  systemEvents: {},
  integrations: [
    new SlackIntegration({
      config: {
        CLIENT_ID: process.env.SLACK_CLIENT_ID!,
        CLIENT_SECRET: process.env.SLACK_CLIENT_SECRET!,
        REDIRECT_URI: `https://redirectmeto.com/${new URL(
          '/api/arkw/connect/callback',
          process.env.APP_URL,
        ).toString()}`,
      },
    }),

    new XIntegration({
      config: {
        CLIENT_ID: process.env.X_CLIENT_ID!,
        CLIENT_SECRET: process.env.X_CLIENT_SECRET!,
        REDIRECT_URI: new URL('/api/arkw/connect/callback', process.env.APP_URL).toString(),
      },
    }),
  ],
  db: {
    provider: 'postgres',
    uri: 'postgresql://postgres:postgres@127.0.0.1:5433/arkwright?schema=arkw',
  },
  systemHostURL: process.env.APP_URL!,
  routeRegistrationPath: '/api/arkw',
  blueprintDirPath: '/arkw-blueprints',
};