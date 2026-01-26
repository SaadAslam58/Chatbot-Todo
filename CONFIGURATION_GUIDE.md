# OpenAI Agent SDK Integration Configuration Guide

This guide explains how to properly configure the entire system with OpenAI Agent SDK integration.

## Overview

The system consists of:
- **Frontend**: Next.js application with chat interface
- **Backend**: FastAPI application with OpenAI Agent SDK integration
- **Database**: PostgreSQL for storing tasks and conversations
- **AI Agent**: Natural language processing for task management

## Environment Configuration

### Backend Configuration

Update `backend/.env` with your OpenAI API key:

```env
# OpenAI API key for AI chat (from platform.openai.com)
OPENAI_API_KEY=sk-your-actual-openai-api-key-here

# CORS allowed origins (comma-separated, for additional origins beyond defaults)
ALLOWED_ORIGINS=http://localhost:3000

# Neon PostgreSQL connection string
DATABASE_URL='postgresql://username:password@host:port/database'

# Shared secret for JWT verification (must match frontend)
BETTER_AUTH_SECRET=your-secret-key-here
```

### Frontend Configuration

Update `frontend/.env` with your backend URL:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=your-secret-key-here
```

## Dependencies

Make sure to install the required dependencies:

### Backend
```bash
cd backend
pip install -r requirements.txt
```

Required packages:
- `openai` - Official OpenAI Python library
- `openai-agents` - OpenAI Agents SDK
- `fastapi` - Web framework
- `sqlmodel` - Database ORM
- `pydantic-settings` - Settings management

### Frontend
```bash
cd frontend
npm install
```

## Running the System

### 1. Start the Backend
```bash
cd backend
uvicorn main:app --reload --port 8000
```

### 2. Start the Frontend
```bash
cd frontend
npm run dev
```

## OpenAI Agent SDK Integration Details

The system uses the OpenAI Agent SDK with the following features:

### 1. Natural Language Processing
- Users can interact with tasks using natural language
- Examples: "Add buy groceries", "Show my tasks", "Complete task 1"

### 2. Multi-task Operations
- Support for multiple operations in one message
- Example: "Add buy milk and add pick up dry cleaning"

### 3. Tool Functions
The agent has access to these functions:
- `add_task`: Create new tasks
- `list_tasks`: Show tasks with filters
- `complete_task`: Mark tasks as completed
- `delete_task`: Remove tasks
- `update_task`: Modify task details

### 4. Error Handling and Retry Logic
- Exponential backoff for API failures
- Rate limit handling
- Graceful fallback to keyword matching when API is unavailable

### 5. Conversation Persistence
- Maintains conversation history in database
- Continues context across multiple messages
- Supports multiple concurrent conversations per user

## Customization

### Modifying System Instructions
Update the `SYSTEM_INSTRUCTIONS` constant in `backend/agent.py` to change how the agent behaves.

### Adding New Tools
Add new functions decorated with `@function_tool` in `backend/agent.py` and include them in the agent's tools list.

### Model Selection
Change the model in the `create_agent()` function:
- `gpt-4o-mini` - Cost-effective, good for task management
- `gpt-4o` - More capable, higher cost
- `gpt-3.5-turbo` - Faster, less expensive

## Troubleshooting

### Common Issues

1. **API Key Issues**: Ensure your OpenAI API key is valid and has sufficient credits
2. **CORS Errors**: Make sure ALLOWED_ORIGINS includes your frontend URL
3. **Database Connection**: Verify your DATABASE_URL is correct
4. **Authentication**: Ensure BETTER_AUTH_SECRET matches between frontend and backend

### Debugging
- Check backend logs for detailed error messages
- Use browser developer tools to inspect API requests
- Enable debug logging by changing logging level in agent.py

## Security Considerations

- Store API keys securely in environment variables
- Use strong, unique secrets for BETTER_AUTH_SECRET
- Validate and sanitize all user inputs
- Monitor API usage to control costs