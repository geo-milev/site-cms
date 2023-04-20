FROM node:19 as base
WORKDIR /app
COPY ["package.json", "package-lock.json", "./"]
RUN npm ci --legacy-peer-deps
COPY . .

FROM base as development
ENV NODE_ENV=development
EXPOSE 3000
CMD ["npm", "run", "dev"]

FROM base as production
ENV NODE_ENV=production
RUN npm run build
RUN npm prune
EXPOSE 3000
ENV PAYLOAD_CONFIG_PATH=dist/payload.config.js
CMD ["node", "dist/server.js"]
