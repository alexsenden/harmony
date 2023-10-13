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

# Compile App
RUN npx next build

# Cleanup
RUN rm -rf src

EXPOSE 8080

CMD [ "npm", "run", "start" ]
