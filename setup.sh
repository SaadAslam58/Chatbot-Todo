#!/bin/bash
# Setup script for OpenAI Agent SDK Todo App

echo "OpenAI Agent SDK Todo App Setup Script"
echo "======================================="

# Check if we're in the right directory
if [ ! -f "backend/requirements.txt" ] || [ ! -f "frontend/package.json" ]; then
    echo "Error: This script must be run from the project root directory"
    echo "Expected backend/requirements.txt and frontend/package.json to exist"
    exit 1
fi

echo "Setting up backend..."
cd backend

# Check if virtual environment exists, create if not
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python -m venv venv
fi

# Activate virtual environment
if [[ "$OSTYPE" == "msys" ]] || [[ "$OSTYPE" == "win32" ]]; then
    source venv/Scripts/activate
else
    source venv/bin/activate
fi

# Install backend dependencies
echo "Installing backend dependencies..."
pip install --upgrade pip
pip install -r requirements.txt

echo "Backend setup complete!"

cd ..

echo "Setting up frontend..."
cd frontend

# Install frontend dependencies
if command -v npm &> /dev/null; then
    echo "Installing frontend dependencies..."
    npm install
    echo "Frontend setup complete!"
else
    echo "Warning: npm not found. Please install Node.js to use the frontend."
fi

cd ..

echo ""
echo "Setup complete!"
echo ""
echo "To run the application:"
echo "1. Backend: cd backend && uvicorn main:app --reload --port 8000"
echo "2. Frontend: cd frontend && npm run dev"
echo ""
echo "Remember to configure your environment variables in:"
echo "- backend/.env (with your OpenAI API key)"
echo "- frontend/.env (with your backend URL)"
echo ""
echo "See CONFIGURATION_GUIDE.md for detailed setup instructions."