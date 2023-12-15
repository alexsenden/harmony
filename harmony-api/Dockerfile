FROM node:18-alpine

# Env Variable
ARG ENV

WORKDIR /app

# Install Dependencies
COPY package*.json .
RUN npm ci --omit=dev
COPY . .

# Copy the correct .env file
RUN if [ "$ENV" = "prod" ] ; then \
  cp ./environment/.env.prod ./.env ; \
  cp ./environment/.env.prod ./1 ; \
  else \
  cp ./environment/.env.local ./.env ; \
  cp ./environment/.env.prod ./2 ; \
  fi

# Install Postgres Client
RUN apk --no-cache add postgresql14-client

# Compile App
RUN npx prisma generate --schema ./prisma/schema.prisma
RUN npx tsc

# Cleanup
RUN rm -rf src
RUN rm -rf environment

EXPOSE 8082

CMD [ "npm", "run", "start" ]

HEALTHCHECK --interval=5m --timeout=10s --retries=3 CMD curl -f http://localhost:8082/ || exit 1
