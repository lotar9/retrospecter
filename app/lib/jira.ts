import SwaggerClient from 'swagger-client';
import pojoDefinition from './jiraopenapi';
import { Team } from '../types/teams';

const getSpec = async ()=> {
    const response = await SwaggerClient.resolve({
        spec: pojoDefinition
    });
    return response.spec;
}

const requestInterceptor = (request: { loadSpec: any; headers: { [x: string]: string; }; }) => {
    request.headers['Authorization'] = 'Basic ' + Buffer.from(process.env.JIRA_API_USERNAME + ':' + process.env.JIRA_API_TOKEN).toString('base64');
    return request;
  };

export const getJiraSprints = async (team: Team) => {
    const response = await SwaggerClient.execute({
        operationId: "getAllSprints",
        spec: await getSpec(),
        baseURL: process.env.JIRA_API_URL,
        parameters: {
            boardId: team.externalBoardId,
            state: ["active","future"]  
        },
        requestContent: 'application/json',
        requestInterceptor
    });
    console.log(response.body);
    return response.body;
}

