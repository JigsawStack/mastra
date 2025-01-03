
    import {  OpenAPIToolset, ToolAction } from '@mastra/core';
    import * as zodSchema from './client/zodSchema';
    import * as integrationClient from './client/services.gen';
    import {comments} from './client/service-comments';
    
    // @ts-ignore
    import JigsawstackLogo from './assets/jigsawstack.svg';

    
    type JigsawstackConfig = {
      API_KEY: string;
      [key: string]: any;
    };
    

    export class JigsawstackIntegration extends OpenAPIToolset {
      readonly name = 'JIGSAWSTACK'
      readonly logoUrl = JigsawstackLogo
      config: JigsawstackConfig
      readonly tools: Record<Exclude<keyof typeof integrationClient, 'client'>, ToolAction<any, any, any, any>>;
      categories = ["dev-tools","ai","automation"]
      description = 'Small models that power your tech stack'
      

      
    constructor({ config }: { config: JigsawstackConfig }) {
        super();

        this.config = config;
        this.tools = this._generateIntegrationTools<typeof this.tools>();
      }
    

      protected get toolSchemas() {
        return zodSchema;
      }

      protected get toolDocumentations() {
        return comments;
      }

     protected get baseClient() {
        integrationClient.client.setConfig({
          baseUrl: `https://api.jigsawstack.com/v1`,
        });
        return integrationClient;
      }

      
    getApiClient = async () => {
      
     const value = {
      'x-api-key': this.config?.['API_KEY']
     } as Record<string, any>

      const baseClient = this.baseClient;

      baseClient.client.interceptors.request.use((request, options) => {
        request.headers.set('x-api-key', value?.['API_KEY'])
        return request;
      });

      return integrationClient;
    }

    

      
    }
  