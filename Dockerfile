from node:18

WORKDIR usr/src/

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 4007
CMD ["node", "main"]