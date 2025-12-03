FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --include=dev

COPY . .

RUN npm run build

RUN cd front/my-app && npm install && npm run build

RUN cp -r front/my-app/build dist/build

RUN npm prune --production

EXPOSE 8000

CMD ["node", "dist/index.js"]
