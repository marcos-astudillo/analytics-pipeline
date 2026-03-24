FROM node:20-alpine

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

CMD ["sh", "-c", "npx prisma migrate deploy && node dist/worker/event.processor.js"]