
           import { describe, it, beforeAll, afterAll
          //expect
          } from '@jest/globals';
          import {Mastra} from '@mastra/core';
          import {JigsawstackIntegration} from '.'

          

          
          const API_KEY = process.env.API_KEY!;
          const dbUri = process.env.DB_URL!;
          const connectionId = process.env.CONNECTION_ID!;

          const integrationName = 'JIGSAWSTACK'

          const integrationFramework = Mastra.init({
          name: 'TestFramework',
          integrations: [
            new JigsawstackIntegration(),
          ],
          workflows: {
            systemApis: [],
            blueprintDirPath: '',
            systemEvents: {},
          },
          db: {
            provider: 'postgres',
            uri: dbUri,
          },
          systemHostURL: 'http://localhost:3000',
          routeRegistrationPath: '/api/mastra',
        });

        //const integration = integrationFramework.getIntegration(integrationName) as JigsawstackIntegration


      describe('jigsawstack', () => {

        beforeAll(async () => {
          
    await integrationFramework.connectIntegrationByCredential({
      name: integrationName,
      connectionId,
      credential: {
        value: {
          API_KEY,
        },
        type: 'API_KEY',
      },
    })
    
        })


        it('should 200 on some apis',async()=>{
          //const client = await integration.getApiClient({ connectionId });
          //const response = await client['/2010-04-01/Accounts.json'].get();
          //expect(response.status).toBe(200);
        })

       afterAll(async()=>{
          
    await integrationFramework.disconnectIntegration({
      name: integrationName,
      connectionId,
    });
  
       })
      })
     