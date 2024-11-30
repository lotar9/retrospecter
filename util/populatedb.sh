echo "Inserting sample data..."
    
AWS_REGION="eu-west-1"  # Change this to your preferred region

    # Sample Team
    aws dynamodb put-item \
        --table-name RetroApp \
        --item '{
            "PK": {"S": "USER#sergio.canales@gmail.com"},
            "SK": {"S": "TEAM#1"},
            "type": {"S": "TEAM"},
            "name": {"S": "SWAT Team 1"},
            "description": {"S": "Team 1 for SWAT"},
            "createdAt": {"S": "'$(date -u +"%Y-%m-%dT%H:%M:%SZ")'"}
        }' \
        --region $AWS_REGION \
        --endpoint-url http://localhost:8000

    aws dynamodb put-item \
        --table-name RetroApp \
        --item '{
            "PK": {"S": "USER#sergio.canales@gmail.com"},
            "SK": {"S": "TEAM#2"},
            "type": {"S": "TEAM"},
            "name": {"S": "ASA Team"},
            "description": {"S": "Aftersales Assistant Team"},
            "createdAt": {"S": "'$(date -u +"%Y-%m-%dT%H:%M:%SZ")'"}
        }' \
        --region $AWS_REGION \
        --endpoint-url http://localhost:8000

    # Sample Sprint
    aws dynamodb put-item \
        --table-name RetroApp \
        --item '{
            "PK": {"S": "TEAM#1"},
            "SK": {"S": "SPRINT#9"},
            "type": {"S": "SPRINT"},
            "sprintNumber": {"N": "9"},
            "startDate": {"S": "'$(date -u +"%Y-%m-%dT%H:%M:%SZ")'"},
            "endDate": {"S": "'$(date -u -d "+2 weeks" +"%Y-%m-%dT%H:%M:%SZ")'"},
            "status": {"S": "active"},
            "GSI2PK": {"S": "TEAM#1"},
            "GSI2SK": {"S": "STATUS#active"}
        }' \
        --region $AWS_REGION \
        --endpoint-url http://localhost:8000

        # Sample Sprint
    aws dynamodb put-item \
        --table-name RetroApp \
        --item '{
            "PK": {"S": "TEAM#1"},
            "SK": {"S": "SPRINT#8"},
            "type": {"S": "SPRINT"},
            "sprintNumber": {"N": "8"},
            "startDate": {"S": "'$(date -u +"%Y-%m-%dT%H:%M:%SZ")'"},
            "endDate": {"S": "'$(date -u -d "+2 weeks" +"%Y-%m-%dT%H:%M:%SZ")'"},
            "status": {"S": "active"},
            "GSI2PK": {"S": "TEAM#1"},
            "GSI2SK": {"S": "STATUS#active"}
        }' \
        --region $AWS_REGION \
        --endpoint-url http://localhost:8000

        # Sample Sprint
    aws dynamodb put-item \
        --table-name RetroApp \
        --item '{
            "PK": {"S": "TEAM#2"},
            "SK": {"S": "SPRINT#18"},
            "type": {"S": "SPRINT"},
            "sprintNumber": {"N": "18"},
            "startDate": {"S": "'$(date -u +"%Y-%m-%dT%H:%M:%SZ")'"},
            "endDate": {"S": "'$(date -u -d "+2 weeks" +"%Y-%m-%dT%H:%M:%SZ")'"},
            "status": {"S": "active"},
            "GSI2PK": {"S": "TEAM#2"},
            "GSI2SK": {"S": "STATUS#active"}
        }' \
        --region $AWS_REGION \
        --endpoint-url http://localhost:8000


    # Sample Column
    aws dynamodb put-item \
        --table-name RetroApp \
        --item '{
            "PK": {"S": "COLUMN#1"},
            "SK": {"S": "METADATA#1"},
            "type": {"S": "COLUMN"},
            "name": {"S": "What went well"},
            "order": {"N": "1"},
            "createdAt": {"S": "'$(date -u +"%Y-%m-%dT%H:%M:%SZ")'"}
        }' \
        --region $AWS_REGION \
        --endpoint-url http://localhost:8000

    aws dynamodb put-item \
        --table-name RetroApp \
        --item '{
            "PK": {"S": "COLUMN#2"},
            "SK": {"S": "METADATA#1"},
            "type": {"S": "COLUMN"},
            "name": {"S": "Stop doing"},
            "order": {"N": "2"},
            "createdAt": {"S": "'$(date -u +"%Y-%m-%dT%H:%M:%SZ")'"}
        }' \
        --region $AWS_REGION \
        --endpoint-url http://localhost:8000

    aws dynamodb put-item \
        --table-name RetroApp \
        --item '{
            "PK": {"S": "COLUMN#3"},
            "SK": {"S": "METADATA#1"},
            "type": {"S": "COLUMN"},
            "name": {"S": "Continue doing"},
            "order": {"N": "3"},
            "createdAt": {"S": "'$(date -u +"%Y-%m-%dT%H:%M:%SZ")'"}
        }' \
        --region $AWS_REGION \
        --endpoint-url http://localhost:8000


    # Sample Cards for Team 1, Sprint 9
    aws dynamodb put-item \
    --table-name RetroApp \
    --item '{
        "PK": {"S": "SPRINT#9"},
        "SK": {"S": "CARD#1"},
        "type": {"S": "CARD"},
        "content": {"S": "Great teamwork on the project!"},
        "category": {"S": "Category1"},
        "createdAt": {"S": "'$(date -u +"%Y-%m-%dT%H:%M:%SZ")'"},
        "createdBy": {"S": "user1"},
        "votes": {"N": "0"},
        "comments": {"N": "0"},
        "GSI1PK": {"S": "TEAM#1"},
        "GSI1SK": {"S": "COLUMN#1"}
    }' \
    --region $AWS_REGION \
    --endpoint-url http://localhost:8000

aws dynamodb put-item \
    --table-name RetroApp \
    --item '{
        "PK": {"S": "SPRINT#9"},
        "SK": {"S": "CARD#2"},
        "type": {"S": "CARD"},
        "content": {"S": "Delivered all features on time"},
        "category": {"S": "Category1"},
        "createdAt": {"S": "'$(date -u +"%Y-%m-%dT%H:%M:%SZ")'"},
        "createdBy": {"S": "user2"},
        "votes": {"N": "0"},
        "comments": {"N": "0"},
        "GSI1PK": {"S": "TEAM#1"},
        "GSI1SK": {"S": "COLUMN#1"}
    }' \
    --region $AWS_REGION \
    --endpoint-url http://localhost:8000

# Sample Cards for Team 1, Sprint 8
aws dynamodb put-item \
    --table-name RetroApp \
    --item '{
        "PK": {"S": "SPRINT#8"},
        "SK": {"S": "CARD#3"},
        "type": {"S": "CARD"},
        "content": {"S": "Last minute changes to requirements"},
        "category": {"S": "Category2"},
        "createdAt": {"S": "'$(date -u +"%Y-%m-%dT%H:%M:%SZ")'"},
        "createdBy": {"S": "user3"},
        "votes": {"N": "0"},
        "comments": {"N": "0"},
        "GSI1PK": {"S": "TEAM#1"},
        "GSI1SK": {"S": "COLUMN#2"}
    }' \
    --region $AWS_REGION \
    --endpoint-url http://localhost:8000

aws dynamodb put-item \
    --table-name RetroApp \
    --item '{
        "PK": {"S": "SPRINT#8"},
        "SK": {"S": "CARD#4"},
        "type": {"S": "CARD"},
        "content": {"S": "Working in silos without communication"},
        "category": {"S": "Category2"},
        "createdAt": {"S": "'$(date -u +"%Y-%m-%dT%H:%M:%SZ")'"},
        "createdBy": {"S": "user4"},
        "votes": {"N": "0"},
        "comments": {"N": "0"},
        "GSI1PK": {"S": "TEAM#1"},
        "GSI1SK": {"S": "COLUMN#2"}
    }' \
    --region $AWS_REGION \
    --endpoint-url http://localhost:8000

# Sample Cards for Team 2, Sprint 18
aws dynamodb put-item \
    --table-name RetroApp \
    --item '{
        "PK": {"S": "SPRINT#18"},
        "SK": {"S": "CARD#5"},
        "type": {"S": "CARD"},
        "content": {"S": "Daily standup meetings"},
        "category": {"S": "Category3"},
        "createdAt": {"S": "'$(date -u +"%Y-%m-%dT%H:%M:%SZ")'"},
        "createdBy": {"S": "user5"},
        "votes": {"N": "0"},
        "comments": {"N": "0"},
        "GSI1PK": {"S": "TEAM#2"},
        "GSI1SK": {"S": "COLUMN#3"}
    }' \
    --region $AWS_REGION \
    --endpoint-url http://localhost:8000

aws dynamodb put-item \
    --table-name RetroApp \
    --item '{
        "PK": {"S": "SPRINT#18"},
        "SK": {"S": "CARD#6"},
        "type": {"S": "CARD"},
        "content": {"S": "Code review process"},
        "category": {"S": "Category3"},
        "createdAt": {"S": "'$(date -u +"%Y-%m-%dT%H:%M:%SZ")'"},
        "createdBy": {"S": "user6"},
        "votes": {"N": "0"},
        "comments": {"N": "0"},
        "GSI1PK": {"S": "TEAM#2"},
        "GSI1SK": {"S": "COLUMN#3"}
    }' \
    --region $AWS_REGION \
    --endpoint-url http://localhost:8000
    # Sample Cards for Team 2, Sprint 9
    aws dynamodb put-item \
        --table-name RetroApp \
        --item '{
            "PK": {"S": "SPRINT#18"},
            "SK": {"S": "CARD#7"},
            "type": {"S": "CARD"},
            "content": {"S": "Improved deployment process"},
            "category": {"S": "Category4"},
            "createdAt": {"S": "'$(date -u +"%Y-%m-%dT%H:%M:%SZ")'"},
            "createdBy": {"S": "user7"},
            "votes": {"N": "0"},
            "comments": {"N": "0"},
            "GSI1PK": {"S": "TEAM#2"},
            "GSI1SK": {"S": "COLUMN#1"}
        }' \
        --region $AWS_REGION \
        --endpoint-url http://localhost:8000

    aws dynamodb put-item \
        --table-name RetroApp \
        --item '{
            "PK": {"S": "SPRINT#18"},
            "SK": {"S": "CARD#8"},
            "type": {"S": "CARD"},
            "content": {"S": "Better sprint planning"},
            "category": {"S": "Category4"},
            "createdAt": {"S": "'$(date -u +"%Y-%m-%dT%H:%M:%SZ")'"},
            "createdBy": {"S": "user8"},
            "votes": {"N": "0"},
            "comments": {"N": "0"},
            "GSI1PK": {"S": "TEAM#2"},
            "GSI1SK": {"S": "COLUMN#1"}
        }' \
        --region $AWS_REGION \
        --endpoint-url http://localhost:8000

    # Sample Cards for Team 2, Sprint 8
    aws dynamodb put-item \
        --table-name RetroApp \
        --item '{
            "PK": {"S": "SPRINT#18"},
            "SK": {"S": "CARD#9"},
            "type": {"S": "CARD"},
            "content": {"S": "Need more pair programming"},
            "category": {"S": "Category5"},
            "createdAt": {"S": "'$(date -u +"%Y-%m-%dT%H:%M:%SZ")'"},
            "createdBy": {"S": "user9"},
            "votes": {"N": "0"},
            "comments": {"N": "0"},
            "GSI1PK": {"S": "TEAM#2"},
            "GSI1SK": {"S": "COLUMN#2"}
        }' \
        --region $AWS_REGION \
        --endpoint-url http://localhost:8000

    aws dynamodb put-item \
        --table-name RetroApp \
        --item '{
            "PK": {"S": "SPRINT#18"},
            "SK": {"S": "CARD#10"},
            "type": {"S": "CARD"},
            "content": {"S": "Improve code quality"},
            "category": {"S": "Category5"},
            "createdAt": {"S": "'$(date -u +"%Y-%m-%dT%H:%M:%SZ")'"},
            "createdBy": {"S": "user10"},
            "votes": {"N": "0"},
            "comments": {"N": "0"},
            "GSI1PK": {"S": "TEAM#2"},
            "GSI1SK": {"S": "COLUMN#2"}
        }' \
        --region $AWS_REGION \
        --endpoint-url http://localhost:8000
echo "Sample data inserted successfully!"
# Sample Cards for Team 1, Sprint 8
aws dynamodb put-item \
    --table-name RetroApp \
    --item '{
        "PK": {"S": "SPRINT#8"},
        "SK": {"S": "CARD#1"},
        "type": {"S": "CARD"},
        "content": {"S": "Last minute changes to requirements"},
        "category": {"S": "Category2"},
        "createdAt": {"S": "'$(date -u +"%Y-%m-%dT%H:%M:%SZ")'"},
        "createdBy": {"S": "user3"},
        "votes": {"N": "0"},
        "comments": {"N": "0"},
        "GSI1PK": {"S": "TEAM#1"},
        "GSI1SK": {"S": "COLUMN#2"}
    }' \
    --region $AWS_REGION \
    --endpoint-url http://localhost:8000

aws dynamodb put-item \
    --table-name RetroApp \
    --item '{
        "PK": {"S": "SPRINT#8"},
        "SK": {"S": "CARD#2"},
        "type": {"S": "CARD"},
        "content": {"S": "Working in silos without communication"},
        "category": {"S": "Category2"},
        "createdAt": {"S": "'$(date -u +"%Y-%m-%dT%H:%M:%SZ")'"},
        "createdBy": {"S": "user4"},
        "votes": {"N": "0"},
        "comments": {"N": "0"},
        "GSI1PK": {"S": "TEAM#1"},
        "GSI1SK": {"S": "COLUMN#2"}
    }' \
    --region $AWS_REGION \
    --endpoint-url http://localhost:8000

# Sample Cards for Team 1, Sprint 9
aws dynamodb put-item \
    --table-name RetroApp \
    --item '{
        "PK": {"S": "SPRINT#9"},
        "SK": {"S": "CARD#1"},
        "type": {"S": "CARD"},
        "content": {"S": "Great teamwork on the project!"},
        "category": {"S": "Category1"},
        "createdAt": {"S": "'$(date -u +"%Y-%m-%dT%H:%M:%SZ")'"},
        "createdBy": {"S": "user1"},
        "votes": {"N": "0"},
        "comments": {"N": "0"},
        "GSI1PK": {"S": "TEAM#1"},
        "GSI1SK": {"S": "COLUMN#1"}
    }' \
    --region $AWS_REGION \
    --endpoint-url http://localhost:8000

aws dynamodb put-item \
    --table-name RetroApp \
    --item '{
        "PK": {"S": "SPRINT#9"},
        "SK": {"S": "CARD#2"},
        "type": {"S": "CARD"},
        "content": {"S": "Delivered all features on time"},
        "category": {"S": "Category1"},
        "createdAt": {"S": "'$(date -u +"%Y-%m-%dT%H:%M:%SZ")'"},
        "createdBy": {"S": "user2"},
        "votes": {"N": "0"},
        "comments": {"N": "0"},
        "GSI1PK": {"S": "TEAM#1"},
        "GSI1SK": {"S": "COLUMN#1"}
    }' \
    --region $AWS_REGION \
    --endpoint-url http://localhost:8000

# Sample Cards for Team 2, Sprint 18
aws dynamodb put-item \
    --table-name RetroApp \
    --item '{
        "PK": {"S": "SPRINT#18"},
        "SK": {"S": "CARD#1"},
        "type": {"S": "CARD"},
        "content": {"S": "Daily standup meetings"},
        "category": {"S": "Category3"},
        "createdAt": {"S": "'$(date -u +"%Y-%m-%dT%H:%M:%SZ")'"},
        "createdBy": {"S": "user5"},
        "votes": {"N": "0"},
        "comments": {"N": "0"},
        "GSI1PK": {"S": "TEAM#2"},
        "GSI1SK": {"S": "COLUMN#3"}
    }' \
    --region $AWS_REGION \
    --endpoint-url http://localhost:8000

aws dynamodb put-item \
    --table-name RetroApp \
    --item '{
        "PK": {"S": "SPRINT#18"},
        "SK": {"S": "CARD#2"},
        "type": {"S": "CARD"},
        "content": {"S": "Code review process"},
        "category": {"S": "Category3"},
        "createdAt": {"S": "'$(date -u +"%Y-%m-%dT%H:%M:%SZ")'"},
        "createdBy": {"S": "user6"},
        "votes": {"N": "0"},
        "comments": {"N": "0"},
        "GSI1PK": {"S": "TEAM#2"},
        "GSI1SK": {"S": "COLUMN#3"}
    }' \
    --region $AWS_REGION \
    --endpoint-url http://localhost:8000

aws dynamodb put-item \
    --table-name RetroApp \
    --item '{
        "PK": {"S": "SPRINT#18"},
        "SK": {"S": "CARD#3"},
        "type": {"S": "CARD"},
        "content": {"S": "Need more pair programming"},
        "category": {"S": "Category5"},
        "createdAt": {"S": "'$(date -u +"%Y-%m-%dT%H:%M:%SZ")'"},
        "createdBy": {"S": "user9"},
        "votes": {"N": "0"},
        "comments": {"N": "0"},
        "GSI1PK": {"S": "TEAM#2"},
        "GSI1SK": {"S": "COLUMN#2"}
    }' \
    --region $AWS_REGION \
    --endpoint-url http://localhost:8000

aws dynamodb put-item \
    --table-name RetroApp \
    --item '{
        "PK": {"S": "SPRINT#18"},
        "SK": {"S": "CARD#4"},
        "type": {"S": "CARD"},
        "content": {"S": "Improve code quality"},
        "category": {"S": "Category5"},
        "createdAt": {"S": "'$(date -u +"%Y-%m-%dT%H:%M:%SZ")'"},
        "createdBy": {"S": "user10"},
        "votes": {"N": "0"},
        "comments": {"N": "0"},
        "GSI1PK": {"S": "TEAM#2"},
        "GSI1SK": {"S": "COLUMN#2"}
    }' \
    --region $AWS_REGION \
    --endpoint-url http://localhost:8000
