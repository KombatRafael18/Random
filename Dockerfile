FROM n8nio/n8n:latest

WORKDIR /home/node/.n8n/custom

COPY package.json .

RUN npm install --production

COPY . .

RUN npm run build