
    import { Integration, OpenAPI, IntegrationCredentialType, IntegrationAuth } from '@kpl/core';
    import { createClient, type OASClient, type NormalizeOAS } from 'fets'
    import { openapi } from './openapi'
    import { paths } from './openapi-paths'
    import { components } from './openapi-components'
    
    // @ts-ignore
    import GithubLogo from './assets/github.svg';

    

    export class GithubIntegration extends Integration {
      


      
    constructor() {
        super({
          authType: IntegrationCredentialType.API_KEY,
          name: 'GITHUB',
          logoUrl: GithubLogo,
          authConnectionOptions: z.object({
          API_KEY: z.string(),
         })
        });
      }
    

      getOpenApiSpec() {
        return { paths, components } as unknown as OpenAPI;
      }

      
  getApiClient = async ({ referenceId }: { referenceId: string }): Promise<OASClient<NormalizeOAS<openapi>>> => {
    const connection = await this.dataLayer?.getConnectionByReferenceId({ name: this.name, referenceId })

    if (!connection) {
      throw new Error(`Connection not found for referenceId: ${referenceId}`)
    }

     const credential = await this.dataLayer?.getCredentialsByConnectionId(connection.id)
     const value = credential?.value as Record<string, string>

    const client = createClient<NormalizeOAS<openapi>>({
      endpoint: "https://github.com/",
      globalParams: {
        headers: {
          Authorization: `Basic ${btoa(`${value?.['API_KEY']}`)}`
        }
      }
    })

    return client as any
  }
    

      registerEvents() {
        this.events = {
        
        }
        return this.events;
      }

      
    getAuthenticator() {
      return new IntegrationAuth({
        dataAccess: this.dataLayer!,
        // @ts-ignore
        onConnectionCreated: () => {
          // TODO
        },
        config: {
          INTEGRATION_NAME: this.name,
          AUTH_TYPE: this.config.authType,
        },
      });
    }
    
    }
  