# Build Stage
FROM node:22-alpine AS builder

WORKDIR /usr/src/app

COPY package*.json ./
COPY tsconfig.json ../../tsconfig.base.json ./

# Install development dependencies
RUN npm ci

# Copy code and generate prisma client
COPY . .
RUN npx prisma generate

# Build typescript code
RUN npm run build

# Prune devDependencies
RUN npm prune --production

# Production Stage
FROM node:22-alpine

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/prisma ./prisma

EXPOSE 3001

ENV NODE_ENV=production

CMD ["npm", "start"]
