FROM node:21-alpine

RUN npm i -g pnpm

WORKDIR /app

COPY package*.json ./ pnpm-lock.yaml ./

RUN pnpm install

COPY . .

EXPOSE 3000

CMD pnpm run dev