#!/bin/bash

# Script de Teste Completo - BN Soluções
# Este script testa todas as funcionalidades do sistema

echo "🧪 Iniciando Testes Completos - BN Soluções"
echo "=============================================="

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Função para imprimir status
print_status() {
    if [ $1 -eq 0 ]; then
        echo -e "${GREEN}✅ $2${NC}"
    else
        echo -e "${RED}❌ $2${NC}"
    fi
}

# Função para imprimir info
print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# Função para imprimir warning
print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

echo ""
print_info "Verificando pré-requisitos..."

# Verificar Python
python3 --version > /dev/null 2>&1
print_status $? "Python 3 instalado"

# Verificar Node.js
node --version > /dev/null 2>&1
print_status $? "Node.js instalado"

# Verificar npm
npm --version > /dev/null 2>&1
print_status $? "npm instalado"

echo ""
print_info "Verificando estrutura do projeto..."

# Verificar diretórios
[ -d "backend" ]
print_status $? "Diretório backend existe"

[ -d "frontend" ]
print_status $? "Diretório frontend existe"

[ -f "backend/src/main.py" ]
print_status $? "Arquivo main.py existe"

[ -f "frontend/package.json" ]
print_status $? "Arquivo package.json existe"

echo ""
print_info "Verificando dependências do backend..."

# Verificar ambiente virtual
if [ -d "backend/venv" ]; then
    print_status 0 "Ambiente virtual Python existe"
    
    # Ativar ambiente virtual
    source backend/venv/bin/activate 2>/dev/null
    if [ $? -eq 0 ]; then
        print_status 0 "Ambiente virtual ativado"
        
        # Verificar dependências Python
        pip list | grep -q "Flask"
        print_status $? "Flask instalado"
        
        pip list | grep -q "flask-cors"
        print_status $? "Flask-CORS instalado"
        
        pip list | grep -q "requests"
        print_status $? "Requests instalado"
    else
        print_status 1 "Erro ao ativar ambiente virtual"
    fi
else
    print_status 1 "Ambiente virtual não encontrado"
    print_warning "Execute: cd backend && python3 -m venv venv"
fi

echo ""
print_info "Verificando dependências do frontend..."

cd frontend 2>/dev/null
if [ $? -eq 0 ]; then
    # Verificar node_modules
    [ -d "node_modules" ]
    print_status $? "node_modules existe"
    
    # Verificar dependências principais
    npm list react > /dev/null 2>&1
    print_status $? "React instalado"
    
    npm list vite > /dev/null 2>&1
    print_status $? "Vite instalado"
    
    npm list lucide-react > /dev/null 2>&1
    print_status $? "Lucide React instalado"
    
    cd ..
else
    print_status 1 "Não foi possível acessar diretório frontend"
fi

echo ""
print_info "Verificando arquivos de configuração..."

# Verificar .env do backend
[ -f "backend/.env" ]
if [ $? -eq 0 ]; then
    print_status 0 "Arquivo .env do backend existe"
    
    # Verificar variáveis essenciais
    grep -q "SECRET_KEY" backend/.env
    print_status $? "SECRET_KEY configurada"
    
    grep -q "PERPLEXITY_API_KEY" backend/.env
    print_status $? "PERPLEXITY_API_KEY configurada"
    
    grep -q "SMTP_USERNAME" backend/.env
    print_status $? "SMTP_USERNAME configurada"
else
    print_status 1 "Arquivo .env do backend não encontrado"
    print_warning "Copie backend/.env.example para backend/.env"
fi

# Verificar .env.local do frontend
[ -f "frontend/.env.local" ]
if [ $? -eq 0 ]; then
    print_status 0 "Arquivo .env.local do frontend existe"
    
    grep -q "VITE_API_URL" frontend/.env.local
    print_status $? "VITE_API_URL configurada"
else
    print_status 1 "Arquivo .env.local do frontend não encontrado"
    print_warning "Copie frontend/.env.example para frontend/.env.local"
fi

echo ""
print_info "Testando build do frontend..."

cd frontend
npm run build > /dev/null 2>&1
if [ $? -eq 0 ]; then
    print_status 0 "Build do frontend executado com sucesso"
    
    [ -d "dist" ]
    print_status $? "Diretório dist criado"
    
    [ -f "dist/index.html" ]
    print_status $? "Arquivo index.html gerado"
    
    # Copiar para backend
    cp -r dist/* ../backend/src/static/ 2>/dev/null
    print_status $? "Arquivos copiados para backend"
else
    print_status 1 "Erro no build do frontend"
fi
cd ..

echo ""
print_info "Testando inicialização do backend..."

# Verificar se o backend pode ser importado
cd backend
source venv/bin/activate 2>/dev/null
python3 -c "
try:
    from src.main import app
    print('Backend importado com sucesso')
    exit(0)
except Exception as e:
    print(f'Erro ao importar backend: {e}')
    exit(1)
" > /dev/null 2>&1

print_status $? "Backend pode ser importado"

# Verificar banco de dados
python3 -c "
try:
    from src.models.lead import db, app
    with app.app_context():
        db.create_all()
    print('Banco de dados inicializado')
    exit(0)
except Exception as e:
    print(f'Erro no banco: {e}')
    exit(1)
" > /dev/null 2>&1

print_status $? "Banco de dados inicializado"

cd ..

echo ""
print_info "Testando conectividade (se servidor estiver rodando)..."

# Testar se o servidor está rodando
curl -s http://localhost:5000 > /dev/null 2>&1
if [ $? -eq 0 ]; then
    print_status 0 "Servidor respondendo na porta 5000"
    
    # Testar API de health
    curl -s http://localhost:5000/api/health | grep -q "ok"
    print_status $? "API de health funcionando"
    
    # Testar página principal
    curl -s http://localhost:5000 | grep -q "BN Soluções"
    print_status $? "Página principal carregando"
    
else
    print_warning "Servidor não está rodando na porta 5000"
    print_info "Para iniciar: cd backend && source venv/bin/activate && python src/main.py"
fi

echo ""
print_info "Verificando assets..."

# Verificar logo
[ -f "logo.png" ]
print_status $? "Logo da empresa existe"

[ -f "favicon.png" ]
print_status $? "Favicon existe"

# Verificar se assets foram copiados
[ -f "backend/src/static/assets/logo.png" ] || [ -f "backend/src/static/logo.png" ]
print_status $? "Logo copiado para static"

echo ""
print_info "Verificando documentação..."

[ -f "README.md" ]
print_status $? "README.md existe"

[ -f "INSTALL.md" ]
print_status $? "INSTALL.md existe"

[ -f "DEPLOY.md" ]
print_status $? "DEPLOY.md existe"

echo ""
print_info "Verificando segurança..."

# Verificar se .env não está no git
git check-ignore backend/.env > /dev/null 2>&1
print_status $? "Arquivo .env ignorado pelo git"

git check-ignore frontend/.env.local > /dev/null 2>&1
print_status $? "Arquivo .env.local ignorado pelo git"

# Verificar se há senhas hardcoded
grep -r "password.*=" backend/src/ | grep -v ".pyc" | grep -v "__pycache__" > /dev/null 2>&1
if [ $? -eq 0 ]; then
    print_status 1 "Possíveis senhas hardcoded encontradas"
else
    print_status 0 "Nenhuma senha hardcoded encontrada"
fi

echo ""
print_info "Resumo dos Testes"
echo "=================="

# Contar sucessos e falhas
total_tests=$(grep -c "print_status" "$0")
echo "Total de testes executados: $total_tests"

echo ""
print_info "Próximos passos:"
echo "1. Se todos os testes passaram, o projeto está pronto!"
echo "2. Para executar localmente:"
echo "   - Backend: cd backend && source venv/bin/activate && python src/main.py"
echo "   - Frontend (dev): cd frontend && npm start"
echo "3. Para deploy, consulte DEPLOY.md"
echo "4. Para mais informações, consulte README.md"

echo ""
echo "🎉 Testes concluídos!"
echo ""

# Verificar se há algum processo do Flask rodando
pgrep -f "python.*main.py" > /dev/null 2>&1
if [ $? -eq 0 ]; then
    print_info "Servidor Flask está rodando em background"
    print_info "Acesse: http://localhost:5000"
else
    print_info "Para iniciar o servidor:"
    echo "cd backend && source venv/bin/activate && python src/main.py"
fi

