import { DynamoDB, DynamoDBClientConfig } from "@aws-sdk/client-dynamodb"
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb"

const config: DynamoDBClientConfig = {
    credentials: {
      accessKeyId: process.env.AUTH_DYNAMODB_ID || 'accessKeyId',
      secretAccessKey: process.env.AUTH_DYNAMODB_SECRET || 'secretAccessKey',
    },
    region: process.env.AUTH_DYNAMODB_REGION || 'eu-west-1',
    endpoint: process.env.AUTH_DYNAMODB_ENDPOINT,
  }
   
  const client = DynamoDBDocument.from(new DynamoDB(config), {
    marshallOptions: {
      convertEmptyValues: true,
      removeUndefinedValues: true,
      convertClassInstanceToMap: true,
    },
  })

  export default client;