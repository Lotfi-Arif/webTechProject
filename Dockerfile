FROM node:12 As base

WORKDIR /app
COPY package.json \
  package-lock.json \
  ./
RUN yarn --production
RUN curl -sf https://gobinaries.com/tj/node-prune | sh
RUN node-prune

# lint and formatting configs are commented out
# uncomment if you want to add them into the build process

FROM base AS dev
COPY nest-cli.json \
  tsconfig.* \
#  .eslintrc.js \
#  .prettierrc \
  ./
# bring in src from context
COPY ./src/ ./src/
RUN npm install
# RUN yarn lint
RUN npm run build

# use one of the smallest images possible
FROM node:12-alpine
# get package.json from base
COPY --from=BASE /app/package.json ./
# get the dist back
COPY --from=DEV /app/dist/ ./dist/
# get the node_modules from the intial cache
COPY --from=BASE /app/node_modules/ ./node_modules/

EXPOSE 3000
# start
CMD ["node", "dist/main.js"]