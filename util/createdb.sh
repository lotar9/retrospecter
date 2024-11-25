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
    --table-name RetroApp \
    --attribute-definitions \
        AttributeName=PK,AttributeType=S \
        AttributeName=SK,AttributeType=S \
        AttributeName=GSI1PK,AttributeType=S \
        AttributeName=GSI1SK,AttributeType=S \
        AttributeName=GSI2PK,AttributeType=S \
        AttributeName=GSI2SK,AttributeType=S \
    --key-schema \
        AttributeName=PK,KeyType=HASH \
        AttributeName=SK,KeyType=RANGE \
    --billing-mode PAY_PER_REQUEST \
    --global-secondary-indexes \
        "[
            {
                \"IndexName\": \"GSI1\",
                \"KeySchema\": [
                    {\"AttributeName\": \"GSI1PK\", \"KeyType\": \"HASH\"},
                    {\"AttributeName\": \"GSI1SK\", \"KeyType\": \"RANGE\"}
                ],
                \"Projection\": {
                    \"ProjectionType\": \"ALL\"
                }
            },
            {
                \"IndexName\": \"GSI2\",
                \"KeySchema\": [
                    {\"AttributeName\": \"GSI2PK\", \"KeyType\": \"HASH\"},
                    {\"AttributeName\": \"GSI2SK\", \"KeyType\": \"RANGE\"}
                ],
                \"Projection\": {
                    \"ProjectionType\": \"ALL\"
                }
            }
        ]" \
    --tags Key=Environment,Value=Production \
    --region $AWS_REGION \
    --endpoint-url http://localhost:8000

echo "Waiting for table to become active..."
aws dynamodb wait table-exists --table-name RetroApp --region $AWS_REGION

# Verify table creation
echo "Verifying table creation..."
aws dynamodb describe-table \
    --table-name RetroApp \
    --region $AWS_REGION \
    --endpoint-url http://localhost:8000 \
    --query "Table.TableStatus"

echo "Table creation complete!"

# Optional: Add some sample data for testing
echo "Would you like to insert sample data? (y/n)"
read response

if [ "$response" = "y" ]; then
    echo "Inserting sample data..."
    
    # Sample Team
    aws dynamodb put-item \
        --table-name RetroApp \
        --item '{
            "PK": {"S": "TEAM#1"},
            "SK": {"S": "METADATA#1"},
            "type": {"S": "TEAM"},
            "name": {"S": "Development Team"},
            "description": {"S": "Main development team"},
            "createdAt": {"S": "'$(date -u +"%Y-%m-%dT%H:%M:%SZ")'"}
        }' \
        --region $AWS_REGION
        --endpoint-url http://localhost:8000


    # Sample Column
    aws dynamodb put-item \
        --table-name RetroApp \
        --item '{
            "PK": {"S": "TEAM#1"},
            "SK": {"S": "COLUMN#1"},
            "type": {"S": "COLUMN"},
            "name": {"S": "What went well"},
            "order": {"N": "1"},
            "createdAt": {"S": "'$(date -u +"%Y-%m-%dT%H:%M:%SZ")'"}
        }' \
        --region $AWS_REGION
        --endpoint-url http://localhost:8000


    # Sample Sprint
    aws dynamodb put-item \
        --table-name RetroApp \
        --item '{
            "PK": {"S": "TEAM#1"},
            "SK": {"S": "SPRINT#1"},
            "type": {"S": "SPRINT"},
            "sprintNumber": {"N": "1"},
            "startDate": {"S": "'$(date -u +"%Y-%m-%dT%H:%M:%SZ")'"},
            "endDate": {"S": "'$(date -u -d "+2 weeks" +"%Y-%m-%dT%H:%M:%SZ")'"},
            "status": {"S": "active"},
            "GSI2PK": {"S": "TEAM#1"},
            "GSI2SK": {"S": "STATUS#active"}
        }' \
        --region $AWS_REGION \
        --endpoint-url http://localhost:8000


    echo "Sample data inserted successfully!"
fi

echo "Setup complete!"