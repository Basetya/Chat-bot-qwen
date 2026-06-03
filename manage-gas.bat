@echo off
echo Welcome to Chatbot GAS Management
echo.

:menu
echo Select an option:
echo 1. Login to Clasp
echo 2. Create new GAS project
echo 3. Clone existing project
echo 4. Push changes to GAS
echo 5. Deploy project
echo 6. Open project in browser
echo 7. Check project status
echo 8. Exit
echo.

set /p choice="Enter your choice (1-8): "

if "%choice%"=="1" goto login
if "%choice%"=="2" goto create
if "%choice%"=="3" goto clone
if "%choice%"=="4" goto push
if "%choice%"=="5" goto deploy
if "%choice%"=="6" goto open
if "%choice%"=="7" goto status
if "%choice%"=="8" goto exit

echo Invalid choice. Please select 1-8.
pause
goto menu

:login
echo Logging in to Clasp...
clasp login
pause
goto menu

:create
set /p title="Enter project title: "
clasp create --type standalone --title "%title%"
echo Project created. Updating .clasp.json...
pause
goto menu

:clone
set /p scriptId="Enter script ID to clone: "
clasp clone %scriptId%
echo Project cloned.
pause
goto menu

:push
echo Pushing changes to GAS...
clasp push
echo Changes pushed.
pause
goto menu

:deploy
echo Deploying project...
clasp deploy
echo Project deployed.
pause
goto menu

:open
echo Opening project in browser...
clasp open
pause
goto menu

:status
echo Checking project status...
clasp status
pause
goto menu

:exit
echo Exiting...
exit /b