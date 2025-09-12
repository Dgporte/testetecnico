@echo off
echo ==================================================
echo  Build e Deploy da Aplicacao Angular com Docker
echo ==================================================

echo.
echo [1/4] Parando containers existentes...
docker-compose down 2>nul

echo.
echo [2/4] Construindo imagem Docker...
docker build -t teste-tecnico:latest .

if %ERRORLEVEL% NEQ 0 (
    echo ERRO: Falha no build da imagem Docker
    pause
    exit /b 1
)

echo.
echo [3/4] Iniciando container...
docker-compose up -d

if %ERRORLEVEL% NEQ 0 (
    echo ERRO: Falha ao iniciar container
    pause
    exit /b 1
)

echo.
echo [4/4] Verificando status...
docker-compose ps

echo.
echo ==================================================
echo  ✅ DEPLOY CONCLUIDO COM SUCESSO!
echo ==================================================
echo.
echo 🌐 Aplicacao disponivel em: http://localhost:8080
echo 📊 Para ver logs: docker-compose logs -f
echo 🛑 Para parar: docker-compose down
echo.
pause