# Instalação das dependências

## Entra na pasta Front
- `cd /Front`
- `npm install ou yarn install`
- `npm run build ou yarn build`

# Construção e execução do Docker
## Construção
`docker build -t checkout-mercado-pago .`

## execução
`docker run -p 8080:80 -d checkout-mercado-pago`

# Ativação do Backend
volte uma pasta com `cd ..`
entre na pasta do backend `cd /Back`
## Ativando a virtual env
`source /venv/bin/activate`
## baixando dependências
`pip install -r requirements.txt`
## execução do backend
`flask run`

Após esses passos a aplicação irá rodar na porta 8080 do seu brownser

# Integrantes do grupo
- Jardiel
- Samira
- Lais
