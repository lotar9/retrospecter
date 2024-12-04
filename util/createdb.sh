#!/bin/bash

# Set your AWS region
AWS_REGION="us-east-1"  # Change this to your preferred region

echo "Creating DynamoDB table for next-auth..."

aws dynamodb create-table \
  --table-name next-auth \
  --attribute-definitions \
    AttributeName=pk,AttributeType=S \
    AttributeName=sk,AttributeType=S \
    AttributeName=GSI1PK,AttributeType=S \
    AttributeName=GSI1SK,AttributeType=S \
  --key-schema \
    AttributeName=pk,KeyType=HASH \
    AttributeName=sk,KeyType=RANGE \
  --global-secondary-indexes \
    "[{
        \"IndexName\": \"GSI1\",
        \"KeySchema\": [
            {\"AttributeName\": \"GSI1PK\", \"KeyType\": \"HASH\"},
            {\"AttributeName\": \"GSI1SK\", \"KeyType\": \"RANGE\"}
        ],
        \"Projection\": {
            \"ProjectionType\": \"ALL\"
        }
    }]" \
  --billing-mode PAY_PER_REQUEST \
  --stream-specification StreamEnabled=false \
  --region eu-west-1 \
  --endpoint-url http://localhost:8000

echo "Creating DynamoDB table for Retro App..."

aws dynamodb create-table \
    --endpoint-url http://localhost:8000 \
    --table-name AgileTeams \
    --attribute-definitions \
        AttributeName=PK,AttributeType=S \
        AttributeName=SK,AttributeType=S \
        AttributeName=GSI1PK,AttributeType=S \
        AttributeName=GSI1SK,AttributeType=S \
    --key-schema \
        AttributeName=PK,KeyType=HASH \
        AttributeName=SK,KeyType=RANGE \
    --global-secondary-indexes \
        "[{\"IndexName\": \"GSI1\",\"KeySchema\":[{\"AttributeName\":\"GSI1PK\",\"KeyType\":\"HASH\"},{\"AttributeName\":\"GSI1SK\",\"KeyType\":\"RANGE\"}],\"Projection\":{\"ProjectionType\":\"ALL\"}}]" \
    --billing-mode PAY_PER_REQUEST

echo "Waiting for table to become active..."
aws dynamodb wait table-exists --table-name RetroApp --region $AWS_REGION --endpoint-url http://localhost:8000

# Verify table creation
echo "Verifying table creation..."
aws dynamodb describe-table \
    --table-name RetroApp \
    --region $AWS_REGION \
    --endpoint-url http://localhost:8000 \
    --query "Table.TableStatus"

echo "Table creation complete!"



echo "Setup complete!"