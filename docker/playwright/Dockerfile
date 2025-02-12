FROM mcr.microsoft.com/playwright:v1.50.1-noble

WORKDIR /app

COPY package*.json ./

RUN npm i -g pnpm && pnpm install

RUN npx playwright install

CMD ["npx", "playwright", "test"]

