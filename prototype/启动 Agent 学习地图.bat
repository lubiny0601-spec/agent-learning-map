@echo off
netstat -ano | findstr :8000 >nul
if errorlevel 1 (
  start /min "" "C:\Program Files\nodejs\node.exe" "D:\AI学习地图优化\agent-learning-map\server.cjs"
  timeout /t 2 /nobreak >nul
)
start "" "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" --app="http://localhost:8000/" --window-size=1280,860
