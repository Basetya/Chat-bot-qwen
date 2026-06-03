@echo off
echo Setting up Chatbot GAS project...
echo.

REM Check if logged in to clasp
clasp status >nul 2>&1
if errorlevel 1 (
    echo You are not logged in to clasp. Please run 'clasp login' first.
    pause
    exit /b 1
)

echo Checking project status...
clasp status
echo.

echo To complete setup:
echo 1. If this is a new project, run: clasp create --type standalone --title "Chatbot Backend"
echo 2. Set your API key by calling the setApiKey function in the GAS editor, or run:
echo    clasp push
echo 3. Then go to the GAS editor and run the setApiKey function with your API key
echo 4. Deploy the project: clasp deploy
echo.

echo Current files in project:
dir *.gs *.html *.json *.md
echo.
pause