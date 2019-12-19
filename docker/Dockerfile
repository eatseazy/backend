FROM node:13.3.0-alpine AS base
WORKDIR /app
COPY package.json ./

#
# ----- Dependencies ----- #
FROM base AS dependencies
RUN npm set progress=false && npm config set depth 0
RUN npm install --only=production
RUN cp -R node_modules prod_node_modules
RUN npm install

#
# ----- Builder ----- #
FROM base AS builder
COPY --from=dependencies /app/node_modules ./node_modules
COPY .babelrc ./
COPY src ./src
RUN npm run build

#
# ----- Release ----- #
FROM base AS release
COPY --from=dependencies /app/prod_node_modules ./node_modules
COPY --from=builder /app/build/ ./
EXPOSE 80
CMD [ "node", "./server.js" ]
