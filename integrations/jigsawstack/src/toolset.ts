import { OpenAPIToolset, ToolAction } from "@mastra/core";
import * as integrationClient from './client/services.gen';
import { comments } from './client/service-comments';
import * as zodSchema from './client/zodSchema';


type JigawStackConfig ={
    API_KEY: string;
    [key: string]: any;
}

export class JigsawStackToolset extends OpenAPIToolset {
    readonly name = 'JIGSAWSTACK';
    readonly logoUrl = '';
    config: JigawStackConfig;

    readonly tools: Record<Exclude<keyof typeof integrationClient, 'client'>, ToolAction<any, any, any, any>>;

    categories = ['dev-tools', 'ai', 'automation'];
    description = 'JigawStack Toolset';

    constructor({ config }: { config: JigawStackConfig }) {
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
            API_KEY: this.config?.['API_KEY'],
        } as Record<string, any>;

        const baseClient = this.baseClient;

        baseClient.client.interceptors.request.use(request => {
            request.headers.set('x-api-key', `${value?.['API_KEY']}`);
            return request;
        });

        return integrationClient;
    };
}