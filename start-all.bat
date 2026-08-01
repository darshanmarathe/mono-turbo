@echo off
setlocal

rem Launch the local SaaS stack from any working directory.
set "ROOT=%~dp0"

start "SaaS apps and Fastify proxy" cmd /k "cd /d ""%ROOT%"" && pnpm.cmd dev"
start "DMZ Mock API" cmd /k "cd /d ""%ROOT%"" && dotnet run --project dmz\MockApi"

if exist "%ROOT%node_modules\@storybook\react-vite" (
  start "UI Storybook" cmd /k "cd /d ""%ROOT%"" && pnpm.cmd --filter @repo/ui storybook"
) else (
  echo Storybook was not started because its dependencies are not installed yet.
  echo Run: pnpm.cmd --filter @repo/ui add -D storybook@^10.4.0 @storybook/react-vite@^10.4.0
)

echo.
echo Started the local development services in separate windows.
echo Apps: http://localhost:5173 through http://localhost:5176
echo Proxy: http://localhost:8080/api/health
echo DMZ mock API: http://localhost:9999/api/health
endlocal
