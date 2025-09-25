FROM n8nio/n8n:latest

WORKDIR /home/node/.n8n/custom

COPY --chown=node:node . .

RUN NODE_ENV=development npm install && npm run build